import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsersThunk } from '../services/action';
import { useEffect, useState } from 'react';
import DefaultImage from '../assests/defaultImage.png'

function Preview() {
    let history = useHistory();
    const dispatch = useDispatch()
    const params = useParams()

    const [user,setUser]=useState({})

    useEffect(() => {
        (async () => {
            const usersList = await dispatch(getUsersThunk(localStorage.getItem('token')))
            // console.log(usersList);
            const user = usersList.find((object) => {
                return object.id === +params[0]
            })
            if(user)
            {
                setUser(user)
            }
            else
            {
                history.push(`*`)
            }
        })()
    }, [])

    // console.log(user);
    return (
        <>
            <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h4.fontSize', p: 2 }}>User Details</Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                    <Link to={`/${localStorage.getItem('role')}/usersList`}><Button color='success' variant="contained">Back</Button></Link>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Box sx={{ width: '70%', display: { md: 'flex' }, justifyContent: { md: 'center' } }}>
                    <Box sx={{ border: 1, p: 5, width: { md: '50%' }, m: 4 }}>
                        <Box sx={{ fontWeight: 'bold', py: 1 }} className='text-break'>{user?.name}</Box>
                        <Box sx={{ py: 1 }} className='text-break'>ID:{user?.id}</Box>
                        <Box sx={{ py: 1 }} className='text-break'>{user?.job}</Box>
                        <Box sx={{ py: 1 }} className='text-break'>{user?.name} is a Developer</Box>
                    </Box>
                    <Box sx={{ width: { md: '50%' }, height: 300, m: 4 }}>
                        <img className='w-100' height={'100%'} src={user?.profile_picture} alt=""  onError={(e) => { e.target.src = DefaultImage }} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Preview
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useHistory } from "react-router-dom";
import * as React from 'react';
import CountTable from './countTable';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUsersThunk } from '../services/action';
import { LOGIN } from '../services/actionType';

function Home() {
    const usersList = useSelector(state => state.usersList)
    // console.log(usersList);
    const dispatch = useDispatch()
    let totalCount = 0, maleCount = 0, femaleCount = 0, jobsList = { '-': '-' }
    const history=useHistory()

    if (usersList.length) {
        totalCount = usersList.length

        usersList.forEach(object => {
            if (object.gender === 'male') {
                maleCount += 1;
            }
            else {
                femaleCount += 1;
            }
        })

        jobsList = usersList.reduce((acc, curr) => {
            acc[curr.job.toLowerCase()] = (acc[curr.job.toLowerCase()] || 0) + 1
            return acc;
        }, {})
    }

    function logout(){
        localStorage.setItem('isLogin', false)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        dispatch({type:LOGIN, payload:'response'})
    }

    useEffect(() => {
        dispatch(getUsersThunk(localStorage.getItem('token')))
    }, [])

    return (
        <>
            <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h4.fontSize', m: 2 }}>Home Page</Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Box sx={{ width: '75%', display: 'flex', justifyContent: 'space-between' }}>
                    <Button color='error' variant="contained" onClick={() => { logout() }}>Logout</Button>
                    <Link to='/usersList'><Button variant="contained">User List</Button></Link>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '80%' }}>
                    <CountTable heading={['Total Count']} body={[[totalCount]]} />
                    <CountTable heading={['Men Count', 'Women Count']} body={[[maleCount, femaleCount]]} />
                    <CountTable heading={['Role', 'Count']} body={Object.entries(jobsList)} />
                </Box>
            </Box>
        </>
    )
}
export default Home
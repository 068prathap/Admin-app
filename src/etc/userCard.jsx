import { Box } from "@mui/material"
import Button from '@mui/material/Button';
import { Link, useHistory } from "react-router-dom";
import DefaultImage from '../assests/defaultImage.png'

function UserCard({ userDetails, deleteUser }) {
    let history = useHistory();

    return (
        <>
            <Box sx={{ bgcolor: 'white', p: 2, height: '100%' }} onClick={() => { history.push(`/userDetails/${userDetails.id}`) }}>
                <Box sx={{ height: '250px' }}>
                    <img className="" height={"100%"} width={'100%'} src={userDetails.profile_picture} alt="" onError={(e) => { e.target.src = DefaultImage }} />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ fontWeight: 'bold' }}><p className="text-break text-truncate">{userDetails.name}</p></Box>
                    <Box><p className="text-break text-truncate">{userDetails.job}</p></Box>
                </Box>
                {
                    localStorage.getItem('role') === 'admin' ?
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Link to={`/editUser/${userDetails.id}`}><Button variant="contained" sx={{ m: 1 }} onClick={(event) => event.stopPropagation()}>Edit</Button></Link>
                            <Button color='error' variant="contained" sx={{ m: 1 }} onClick={(event) => { deleteUser(userDetails.id); event.stopPropagation() }}>Delete</Button>
                        </Box>
                        :
                        <></>
                }
            </Box>
        </>
    )
}
export default UserCard
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import UserCard from './userCard';
import Grid from '@mui/system/Unstable_Grid';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getUsersThunk, deleteUserThunk } from '../services/action';

function UsersList(props) {
    const usersList = useSelector(state => state.usersList)
    // console.log(usersList);
    const dispatch = useDispatch()

    function deleteUser(id) {
        dispatch(deleteUserThunk({ token: localStorage.getItem('token'), id: id }))
    }

    useEffect(() => {
        dispatch(getUsersThunk(localStorage.getItem('token')))
    }, [])

    return (
        <>
            <Box sx={{ minHeight: '100vh', bgcolor: 'lightgrey' }}>
                <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h4.fontSize', p: 2 }}>User List</Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                        <Link to={`/${localStorage.getItem('role')}`}><Button variant="contained">Back</Button></Link>
                        {
                            localStorage.getItem('role') === 'admin' ?
                                <Box>
                                    <Link to='/addUser'><Button variant="contained" sx={{ mr: 1 }}>Add User</Button></Link>
                                </Box>
                                :
                                <></>
                        }
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <Box sx={{ width: '80%' }}>
                        <Grid container spacing={10}>
                            {usersList.length ? usersList.map((object) => {
                                return (<Grid xs={12} sm={6} md={4} lg={3} key={object.id}>
                                    <UserCard userDetails={object} deleteUser={deleteUser} />
                                </Grid>)
                            }) :
                                <Grid xs={12}>
                                    <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h4.fontSize', p: 2 }}>No Data Found</Box>
                                </Grid>
                            }
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default UsersList
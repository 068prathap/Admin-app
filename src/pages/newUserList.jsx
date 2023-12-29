import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import UserCardBGImage from '../assests/userCardBGImage.png';
import CloseIcon from '@mui/icons-material/Close';
import DefaultImage from '../assests/defaultImage.png'
import Grid from '@mui/system/Unstable_Grid';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function NewUserList({ usersList, deleteUser }) {
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [userId,setUserId]=useState()

    return (
        <>
            {
                localStorage.getItem('role') === 'admin' ?
                    <Box sx={{ textAlign: 'right' }}>
                        <Link to='/addUser'><Button variant="contained" color="success" sx={{ mr: 6.5 }}>Add User</Button></Link>
                    </Box>
                    :
                    <></>
            }
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={6}>
                    {usersList.length ? usersList.map((object) => {
                        return (
                            <>
                                <Grid xs={12} sm={6} md={4} lg={3} key={object.id}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            sx={{ height: 140, position: 'relative' }}
                                            image={UserCardBGImage}
                                            title="green iguana"
                                        >
                                            {
                                                localStorage.getItem('role') === 'admin' ?
                                                    <>
                                                        <Box sx={{ float: 'right', pt: 2, pr: 2, cursor: 'pointer' }} onClick={() => { setUserId(object.id); setOpen(true) }}>
                                                            <Box sx={{ p: 1, bgcolor: 'black', borderRadius: '50%', opacity: '0.5', position: 'relative', width: '45px', height: '45px' }}></Box>
                                                        </Box>
                                                        <CloseIcon sx={{ display: 'flex', alignItems: 'center', fill: 'white', position: 'absolute', right: 0, mt: '27px', mr: '27px', cursor: 'pointer' }} onClick={() => { setUserId(object.id); setOpen(true) }} />
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            <Box sx={{ borderRadius: '50%', overflow: 'hidden', width: 'fit-content', position: 'absolute', bottom: -45, left: 25 }} onClick={() => { history.push(`/userDetails/${object.id}`) }}>
                                                <img src={object.profile_picture} width={'100px'} height={'100px'} alt="" onError={(e) => { e.target.src = DefaultImage }} />
                                            </Box>
                                        </CardMedia>
                                        <CardContent sx={{ pt: 10 }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {object.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {object.job}
                                            </Typography>
                                        </CardContent>
                                        {
                                            localStorage.getItem('role') === 'admin' ?
                                                <CardActions sx={{ width: '100%' }}>
                                                    <Link to={`/editUser/${object.id}`} className='w-100'><Button variant="contained" color="success" sx={{ p: 1, width: '100%'}} onClick={(event) => event.stopPropagation()}>Edit</Button></Link>
                                                </CardActions>
                                                :
                                                <></>
                                        }
                                    </Card>
                                </Grid>
                            </>
                        )
                    }) :
                        <Grid xs={12}>
                            <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h4.fontSize', p: 2 }}>No Data Found</Box>
                        </Grid>
                    }
                </Grid>
            </Box>
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={() => { setOpen(false) }}
                    scroll={'paper'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Confirmation</DialogTitle>
                    <DialogContent dividers={true}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            Are you shure want to delete this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="error" onClick={() => { setOpen(false) }}>No</Button>
                        <Button variant="outlined" color='success' onClick={() => { setOpen(false); console.log(userId); deleteUser(userId) }}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}
export default NewUserList
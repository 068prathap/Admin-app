import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersThunk, deleteUserThunk } from '../services/action';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MsLogo from '../assests/mitrahsoftLogo.png'
import NewHome from './newHome';
import NewUserList from './newUserList';
import { useHistory } from "react-router-dom";
import { LOGIN } from '../services/actionType';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch()
    const usersList = useSelector(state => state.usersList)
    let totalCount = 0, maleCount = 0, femaleCount = 0, jobsList = {}
    const history = useHistory()
    const userName = useSelector(state => state.userName)
    // console.log(userName)

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
            acc[curr.job] = (acc[curr.job] || 0) + 1
            return acc;
        }, {})
    }

    useEffect(() => {
        dispatch(getUsersThunk(localStorage.getItem('token')))
    }, [])

    function deleteUser(id) {
        dispatch(deleteUserThunk({ token: localStorage.getItem('token'), id: id }))
    }

    function logout(){
        localStorage.setItem('isLogin', false)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        dispatch({type:LOGIN, payload:'response'})
    }

    const handlechangePage=(page)=>
    {
        history.push(`/${localStorage.getItem('role')}/${page}`)
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // console.log(usersList);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{bgcolor:'green'}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Welcome {userName} | {localStorage.getItem('role')}
                        </Typography>
                    </Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', pr: 10, fontWeight: 'bold', fontSize: 20 }}>{props.page}</Box>
                </Box>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <img src={MsLogo} alt="" height={'65px'} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <Box>
                        {['Dashboard', 'Users List'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block', bgcolor:props.page===text ? 'green' : '', color:props.page===text ? 'white' : ''  }} onClick={()=>{index % 2 === 0 ? handlechangePage('dashboard') : handlechangePage('usersList')}}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {index % 2 === 0 ? <DashboardIcon sx={{color:props.page===text ? 'white' : ''}}/> : <GroupIcon  sx={{color:props.page===text ? 'white' : ''}}/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </Box>
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                        <Button sx={{ mb: 4, width:'fit-content' }} color='error' variant="contained" onClick={() => {logout()}}>Logout</Button>
                    </Box>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box>
                    {props.page==='Dashboard' && <NewHome totalCount={totalCount} maleCount={maleCount} femaleCount={femaleCount} jobsList={jobsList} />}
                    {props.page==='Users List' && <NewUserList usersList={usersList} deleteUser={deleteUser} />}
                </Box>
            </Box>
        </Box>
    );
}
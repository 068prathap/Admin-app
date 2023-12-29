import { Box } from "@mui/system"
import { Button } from "@mui/material"
import { Link } from 'react-router-dom'
import Login from "./login"
import Register from "./register"

function Authentication(props) {
    return (
        <>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <Box sx={{ bgcolor: 'green', width: '60%', clipPath: 'polygon(0 0, 0% 100%, 100% 0)', p: 5 }}>
                    <Box sx={{ color: 'white' }}>
                        <Box sx={{ py: 3, fontWeight: 'bold', fontSize: '80px' }}>Welcome!</Box>
                        <Box sx={{ py: 3, fontSize: '30px' }}>{props.page==="Login" ? "Don't have an account" : "Already have an account"}</Box>
                        <Link to={props.page==="Login" ? "/register" : "login"}><Button color='success' variant="outlined" sx={{ color: 'white', borderColor: 'white', borderRadius: '100px', my: 3, fontSize: '30px', '&:hover': { borderColor: "white", color:'green', backgroundColor:'white' }}}>{props.page==="Login" ? "Sign up" : "Sign in"}</Button></Link>
                    </Box>
                </Box>
                {props.page==='Login' ? <Login/> : <Register/> }
            </Box>
        </>
    )
}
export default Authentication
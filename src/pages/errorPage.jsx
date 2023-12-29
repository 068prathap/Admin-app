import Error404Image from '../assests/Error404Image.png'
import { Link } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ErrorPage(props) {
    return (
        <>
            <Box sx={{display:'flex', justifyContent:'center', mt:10}}>
                <Box sx={{width:'80%'}}>
                    <img src={Error404Image} width={'100%'} alt="" />
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}>
                        <Link to={props.redirect}><Button startIcon={<ArrowBackIcon />} color='success' variant="contained" sx={{ mr: 6.5 }}>Go Back to Dashboard</Button></Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default ErrorPage
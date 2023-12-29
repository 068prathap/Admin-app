import { Box } from "@mui/material"
import TextField from '@mui/material/TextField';

function Inputbox(props) {

    return (
        <>
            <Box sx={{ py: 2.5, fontWeight: 'bold' }}>
                <Box sx={{ textAlign: 'center' }}>{props.label}</Box>
                <TextField id={props.name} name={props.name} value={props.value} error={props.error} helperText={props.helperText} fullWidth variant="outlined" size="small" placeholder={`Enter ${props.label}`} onChange={()=>{props.onChange()}}/>
            </Box>
        </>
    )
}
export default Inputbox
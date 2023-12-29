import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

function Radiobox(props) {
    // console.log(props.value[props.name]);
    const [value, setValue] = useState(props.value[props.name]);

    const handleChange = (event) => {
        props.setValues((state) => ({ ...state, [props.name]: event.target.value }));
        setValue(event.target.value)
    };
    
    useEffect(()=>{
        setValue(props.value[props.name])
    },[props.value[props.name]])

    // console.log(value);
    return (
        <>
            <Box sx={{ display: 'flex', fontWeight: 'bold', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'center', pr: 2 }}>{props.label}</Box>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </Box>
                    </RadioGroup>
                    <Box sx={{ color: 'error.main', height: 0, pl: 2, fontSize: 13, fontWeight: 'light' }}>{props.errorMessage[props.name]}</Box>
                </FormControl>
            </Box>

        </>
    )
}
export default Radiobox
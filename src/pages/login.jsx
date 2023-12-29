import { Box } from "@mui/system"
import { Button, TextField } from "@mui/material"
import * as yup from 'yup';
import { useFormik } from 'formik';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../services/action";
import { useEffect } from "react";
import { LOGIN } from "../services/actionType";

function Login() {
    const dispatch = useDispatch()
    let loginResponse = useSelector(state => state.loginResponse)
    // let userName = useSelector(state => state.userName)

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .required('Password is required'),
        role: yup
            .string()
            .required('Role is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            role: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('values', values);

            dispatch(loginThunk(values))
        },
    });

    useEffect(()=>{
        return ()=>{dispatch({type:'DEFAULTLOGIN', payload:''})}
    },[])

    return (
        <>
            <Box sx={{ width: '40%', pr: 10, pt: 15, color: 'black' }}>
                <Box sx={{ fontWeight: 'bold', fontSize: 30 }}>Login</Box>
                <Box>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ py: 3 }}>
                            <Box>Email Address</Box>
                            <TextField fullWidth id="email" name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} InputProps={{ sx: { borderRadius: '100px' } }}/>
                            <Box sx={{ color: '#d32f2f', fontSize: '15px', ml: '14px' }}>{formik.touched.email && formik.errors.email}</Box>
                        </Box>
                        <Box sx={{ py: 3 }}>
                            <Box>Password</Box>
                            <TextField fullWidth id="password" name="password" value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} InputProps={{ sx: { borderRadius: '100px' } }} />
                            <Box sx={{ color: '#d32f2f', fontSize: '15px', ml: '14px' }}>{formik.touched.password && formik.errors.password}</Box>
                        </Box>
                        <Box sx={{ py: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ pr: 2 }}>Role:</Box>
                                <FormControl>
                                    <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" id="role" name="role" value={formik.values.role} onChange={formik.handleChange}>
                                        <Box sx={{ display: 'flex' }}>
                                            <FormControlLabel value="admin" control={<Radio sx={{'&.Mui-checked': {color: 'green'},}}/>} label="Admin" color="green"/>
                                            <FormControlLabel value="user" control={<Radio sx={{'&.Mui-checked': {color: 'green'},}}/>} label="User" />
                                        </Box>
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box sx={{ color: '#d32f2f', fontSize: '15px', ml: '14px' }}>{formik.touched.role && formik.errors.role}</Box>
                        </Box>
                        <Box sx={{ fontWeight: 'bold', textAlign: 'center', color: 'red' }}>{loginResponse}</Box>
                        <Button color='success' variant="outlined" fullWidth type="submit" sx={{ borderRadius: '100px', color: 'green', borderColor: 'green', my: 3 }}>
                            Sign in
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    )
}
export default Login
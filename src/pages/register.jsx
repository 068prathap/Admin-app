import { Box } from "@mui/system"
import { Button, TextField } from "@mui/material"
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../services/action";
import { useHistory } from 'react-router-dom'
import { useEffect } from "react";
import { REGISTER } from "../services/actionType";

function Register() {
    const dispatch = useDispatch()
    const registerResponse = useSelector(state => state.registerResponse)
    // console.log('registerResponse', registerResponse);
    const history = useHistory()

    useEffect(() => {
        if (registerResponse === 'Admin created successfully') {
            alert('Admin created successfully')
            history.push('/')
            dispatch({ type: REGISTER, payload: '' })
        }
    }, [registerResponse])

    useEffect(()=>{
        return ()=>{dispatch({ type: REGISTER, payload: '' })}
    },[])

    const validationSchema = yup.object({
        firstName: yup
            .string()
            .required('First name is required')
            .matches(/^([a-zA-Z])*$/, 'Enter valid first name'),
        lastName: yup
            .string()
            .required('Last name is required')
            .matches(/^([a-zA-Z])*$/, 'Enter valid last name'),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'Enter valid password'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('values', values);

            dispatch(registerThunk(values))
        },
    });

    return (
        <>
            <Box sx={{ width: '40%', pr: 10, pt: 5, color: 'black' }}>
                <Box sx={{ fontWeight: 'bold', fontSize: 30 }}>Register</Box>
                <Box>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ py: 3 }}>
                            <Box>First Name</Box>
                            <TextField fullWidth id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} error={formik.touched.firstName && Boolean(formik.errors.firstName)} InputProps={{ sx: { borderRadius: '100px' } }} />
                            <Box sx={{ color: '#d32f2f', fontSize: '15px', ml: '14px' }}>{formik.touched.firstName && formik.errors.firstName}</Box>
                        </Box>
                        <Box sx={{ py: 3 }}>
                            <Box>Last Name</Box>
                            <TextField fullWidth id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} error={formik.touched.lastName && Boolean(formik.errors.lastName)} InputProps={{ sx: { borderRadius: '100px' } }} />
                            <Box sx={{ color: '#d32f2f', fontSize: '15px', ml: '14px' }}>{formik.touched.lastName && formik.errors.lastName}</Box>
                        
                        </Box>
                        <Box sx={{ py: 3 }}>
                            <Box>Email Address</Box>
                            <TextField fullWidth id="email" name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} InputProps={{ sx: { borderRadius: '100px' } }} />
                            <Box sx={{ color: '#d32f2f', fontSize: '15px', ml: '14px' }}>{registerResponse === 'Please check email' ? registerResponse : ''}</Box>
                            <Box sx={{ color: '#d32f2f', fontSize: '15px', ml: '14px' }}>{formik.touched.email && formik.errors.email}</Box>
                        </Box>
                        <Box sx={{ py: 3 }}>
                            <Box>Password</Box>
                            <TextField fullWidth id="password" name="password" value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} InputProps={{ sx: { borderRadius: '100px' } }} />
                            <Box sx={{ color: '#d32f2f', fontSize: '15px', ml: '14px' }}>{formik.touched.password && formik.errors.password}</Box>
                        </Box>
                        <Button color='success' variant="outlined" fullWidth type="submit" sx={{ borderRadius: '100px', color: 'green', borderColor: 'green', my: 3 }}>
                            Sign up
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    )
}
export default Register
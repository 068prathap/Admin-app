import { Box } from '@mui/material';
import Inputbox from '../components/inputbox';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link, useHistory, useParams } from "react-router-dom"
import Radiobox from '../components/radiobox';
import { useDispatch, useSelector } from "react-redux";
import { addUserThunk } from '../services/action';
import { getUsersThunk, editUserThunk } from '../services/action';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function FormPage(props) {
    const params = useParams()
    // console.log(params);
    let history = useHistory();
    const dispatch = useDispatch();
    let user = {}

    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Name is required')
            .matches(/^([a-zA-Z\s])*$/, 'Enter valid name'),
        profile_picture: yup
            .string()
            .required('Profile is required'),
        job: yup
            .string()
            .required('job is required'),
        gender: yup
            .string()
            .required('Gender is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: user?.name ?? '',
            profile_picture: user?.profile_picture ?? '',
            job: user?.job ?? '',
            gender: user?.gender ?? ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log('values', values);

            let arr = values.name.split(' ')
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            values.name=arr.join(' ')

            if (props.formType === 'Add') {
                dispatch(addUserThunk({ token: localStorage.getItem('token'), details: values }))
                alert('User added successfully')
            }
            else {
                dispatch(editUserThunk({ token: localStorage.getItem('token'), details: values, id: +params[0] }))
                alert('User edited successfully')
            }

            history.push(`/${localStorage.getItem('role')}/usersList`)
        },
    });

    useEffect(() => {
        (async () => {
            const usersList = await dispatch(getUsersThunk(localStorage.getItem('token')))
            // console.log("result", usersList);
            if (usersList.length && usersList) {
                user = usersList.find((object) => {
                    return object.id === +params[0]
                })

                if (!user && props.formType === 'Edit') {
                    history.push(`*`)
                }
                else {
                    formik.resetForm({
                        values: {
                            name: user?.name ?? '',
                            profile_picture: user?.profile_picture ?? '',
                            job: user?.job ?? '',
                            gender: user?.gender ?? ''
                        }
                    })

                }
            }
        })()
    }, [])

    const jobsTitle = [
        'Frontend Developer',
        'Backend Developer',
        'Fullstack Developer',
        'Business Development',
        'Tester',
        'HR',
    ];

    // console.log(userDetails);
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '80%', py: 4 }}>
                    <Link to={`/${localStorage.getItem('role')}/usersList`}><Button color='success' variant="contained">Back</Button></Link>
                </Box>
            </Box>
            <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h4.fontSize', m: 2 }}>{props.formType} User Form</Box>
            <Box sx={{ mx: 5, p: 2, display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ py: 2 }}>
                                <Box sx={{ textAlign: 'center', fontWeight: 'bold' }}>name</Box>
                                <TextField size='small' fullWidth id="name" name="name" value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} />
                            </Box>
                            <Box sx={{ py: 2 }}>
                                <Box sx={{ textAlign: 'center', fontWeight: 'bold' }}>Profile Image URL</Box>
                                <TextField size='small' fullWidth id="profile_picture" name="profile_picture" value={formik.values.profile_picture} onChange={formik.handleChange} error={formik.touched.profile_picture && Boolean(formik.errors.profile_picture)} helperText={formik.touched.profile_picture && formik.errors.profile_picture} />
                            </Box>
                            <FormControl sx={{ width: '100%', py: 2.5 }} size='small'>
                                <Box sx={{ textAlign: 'center', fontWeight: 'bold' }}>Job</Box>
                                <Select
                                    name='job'
                                    value={formik.values.job}
                                    onChange={formik.handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{ width: '100%' }}
                                >
                                    {
                                        jobsTitle.map(jobName => {
                                            return <MenuItem value={jobName}>{jobName}</MenuItem>
                                        })
                                    }
                                </Select>
                                <FormHelperText sx={{ color: 'error.main', fontSize: 13, fontWeight: 'light' }}>{formik.touched.job && formik.errors.job}</FormHelperText>
                            </FormControl>
                            <Box sx={{ display: 'flex', fontWeight: 'bold', alignItems: 'center' }}>
                                <Box sx={{ textAlign: 'center', pr: 2 }}>Gender</Box>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                    >
                                        <Box sx={{ display: 'flex' }}>
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        </Box>
                                    </RadioGroup>
                                    <Box sx={{ color: 'error.main', height: 0, pl: 2, fontSize: 13, fontWeight: 'light' }}>{formik.touched.gender && formik.errors.gender}</Box>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ color: 'error.main', height: 0, fontSize: 14, fontWeight: 'bold' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                        <Button type='submit' sx={{ width: '100%' }} variant="contained" color="success" onClick={() => { }}>Submit</Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}
export default FormPage
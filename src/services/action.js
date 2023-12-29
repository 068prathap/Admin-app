import { LOGIN, REGISTER, GETUSER, EDITUSER } from "./actionType";
import axios from 'axios';

export const registerThunk = (data) => (dispatch) => {
    axios({
        method: "POST",
        url: "http://node.mitrahsoft.co.in/register",
        data: {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password
        }
    })
        .then((res) => {
            console.log("res", res);
            dispatch({
                type: REGISTER,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log("error", err);
            dispatch({
                type: REGISTER,
                payload: data
            })
        })
}

export const loginThunk = (payload) => (dispatch) => {
    // console.log(payload);
    axios({
        method: "POST",
        url: "http://node.mitrahsoft.co.in/login",
        data: {
            email: payload.email,
            password: payload.password
        }
    })
        .then((res) => {
            console.log("res", res.data.email.split('@')[0]);
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('isLogin', true)
            localStorage.setItem('role', payload.role)
            alert('Login successfully')
            dispatch({
                type: LOGIN,
                payload: {res:true, name:res.data.email.split('@')[0]}
            })
        })
        .catch((err) => {
            console.log("error", err.response.data);
            dispatch({
                type: LOGIN,
                payload: err.response.data
            })
        })
}

export const getUsersThunk = (token) => async (dispatch) => {
    try {
        const res = await axios({
            method: "GET",
            url: "http://node.mitrahsoft.co.in/users",
            headers: {
                Authorization: token
            }
        })
        dispatch({
            type: GETUSER,
            payload: res.data.recordset
        })
        return res.data.recordset
    } catch (err) {
        console.log("error", err)
    }
}

export const addUserThunk = ({token,details}) => async (dispatch) => {
    try {
        const res=await axios({
            method: "POST",
            url: "http://node.mitrahsoft.co.in/user",
            headers: {
                Authorization: token
            },
            data: {
                name: details.name,
                gender: details.gender,
                job: details.job,
                profile_img: `${details.profile_picture}`
            }
        })
        // console.log(res);
        dispatch(getUsersThunk(token))
    } catch (err) {
        console.log("error", err)
    }
}

export const editUserThunk = ({token,details,id}) => async (dispatch) => {
    try {
        await axios({
            method: "PUT",
            url: `http://node.mitrahsoft.co.in/user/${id}`,
            headers: {
                Authorization: token
            },
            data: {
                name: details.name,
                gender: details.gender,
                job: details.job,
                profile_img: `${details.profile_picture}`
            }
        })
        dispatch(getUsersThunk(token))
    } catch (err) {
        console.log("error", err)
    }
}

export const deleteUserThunk = ({token,id}) => async (dispatch) => {
    // console.log(dispatch);
    try {
        await axios({
            method: "DELETE",
            url: `http://node.mitrahsoft.co.in/user/${id}`,
            headers: {
                Authorization: token
            }
        })
        alert('User deleted successfully')
        dispatch(getUsersThunk(token))
    } catch (err) {
        console.log("error", err)
    }
}
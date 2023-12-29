import { LOGIN, REGISTER, GETUSER } from "./actionType";

const initialState = {
    registerResponse: '',
    loginResponse: '',
    usersList: [],
    userName: ''
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return { ...state, registerResponse: action.payload }

        case LOGIN:
            return { ...state, loginResponse: action.payload.res, userName: action.payload.name }

        case 'DEFAULTLOGIN':
            return { ...state, loginResponse: action.payload }

        case GETUSER:
            return { ...state, usersList: action.payload }

        default:
            return state
    }
}
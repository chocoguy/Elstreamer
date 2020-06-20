import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, AUTH_ERROR, USER_LOADED } from '../types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: localStorage.getItem('name'),
    error: null
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.auth_token);
            localStorage.setItem('name', payload.info.name)
            return{
                ...state,
                isAuthenticated: true,
                loading: false
            };
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false
            }
        case LOGOUT_SUCCESS:
        case LOGOUT_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: null,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
                ...state,
                error: payload
            }
        default:
            return state;
    }

}


export default authReducer;
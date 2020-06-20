import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, AUTH_ERROR, USER_LOADED } from '../types';



export const loadUser = () => async dispatch => {
    try{

        let jwt = localStorage.getItem('token')
        if(jwt == null){
            dispatch({
                type: AUTH_ERROR
            })
            return
        }

        dispatch({
            type: USER_LOADED
        })

    }catch(error){

        dispatch({
            type: AUTH_ERROR
        })

    }
}


export const register = ({ name, email, password }) => async dispatch => {
    try{

       axios({
            method: 'post',
            url: '/api/v1/users/register',
            headers: {
                "Content-Type" : 'application/json'
            },
            data: {
               "name" : name,
               "email" : email,
               "password" : password
            }
        })
            .then(function (response) {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: response.data
                })
            })
            dispatch(loadUser())

    }catch(error){

        dispatch({
            type: REGISTER_FAIL,
            payload: 'Server error, please register again'
        })

    }
}


export const login = ({ email, password }) => async dispatch => {
    try{        
        axios({
            method: 'post',
            url: '/api/v1/users/login',
            headers: {
                "Content-Type" : 'application/json'
            },
            data: {
               "email" : email,
               "password" : password
            }
        })
            .then(function (response) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data
                })
            })


        dispatch(loadUser())               
    }catch(error){

        dispatch({
            type: LOGIN_FAIL,
            payload: 'Wrong credentials/account does not exist!'
        });
    }
}


export const logout  = () => async dispatch => {
    try{

        let jwt = localStorage.getItem('token')
        if(jwt == null){
            dispatch({
                type: AUTH_ERROR
            })
        }

        axios({
            method: 'post',
            url: '/api/v1/users/logout',
            headers: {
                "Authorization" : `Bearer ${jwt}`
            },
        })
            .then(function (response) {
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: response.data
                })
            })

    }catch(error){
  
        dispatch({
            LOGOUT_FAIL
        });

    }
}
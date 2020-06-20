import axios from 'axios';
import { GET_VOD_BY_ID, GET_VODS, SEARCH_FOR_VOD, SEARCH_FOR_VOD_TYPE, GET_VOD_ERROR, GET_VOD_SERIES } from '../types';



export const getVodById = id => async dispatch => {
    try{

        axios({
            method: 'get',
            url: `api/v1/search/id/${id}`,
        })
            .then(function (response) {
                dispatch({
                    type: GET_VOD_BY_ID,
                    payload: response.data
                })
            })

    }catch(error){

        dispatch({
            type: GET_VOD_ERROR,
            payload: 'Server error, try again later'
        });
    }
}



export const getVodSeries = (series) => async dispatch => {
    try{

        axios({
            method: 'get',
            url: '/api/v1/search/get-series',
            params: {
                text: series
              },
        }) 
            .then(function (response) {
            dispatch({
                type: GET_VOD_SERIES,
                payload: response.data
            })
        })

    }catch(error){

        dispatch({
            type: GET_VOD_ERROR,
            payload: 'Server error, try again later'
        })
    }
}




export const getVods = () => async dispatch => {
    try{

       axios({
            method: 'get',
            url: `/api/v1/search/get`
        })
            .then(function (response) {
                dispatch({
                    type: GET_VODS,
                    payload: response.data.vods
                })
            })

    }catch(error){
   
        dispatch({
            type: GET_VOD_ERROR,
            payload: 'Server error, try again later'
        });
    }
}


export const searchVods = (text) => async dispatch => {
    try{
        
        axios({
            method: 'get',
            url: `/api/v1/search/search-vod`,
            params: {
                text: text
              },
        })
            .then(function (response) {
                dispatch({
                    type: SEARCH_FOR_VOD,
                    payload: response.data.vods
                })
            })      
        

    }catch(error){
    
        dispatch({
            type: GET_VOD_ERROR,
            payload: 'Server error, try again later'
        });

    }
}

export const searchVodsType = ({type}) => async dispatch => {
    try{

        const res = await axios({
            method: 'get',
            url: `/api/v1/search/search-vod?type=${type}`
        })

        dispatch({
            type: SEARCH_FOR_VOD_TYPE,
            payload: res.data
        })


    }catch(error)
    {
  
        dispatch({
            type: GET_VOD_ERROR,
            payload: 'Server error, try again later'
        });

    }
}



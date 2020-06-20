import axios from 'axios';
import { GET_HENTAI_BY_ID, GET_HENTAI, SEARCH_FOR_HENTAI, GET_HENTAI_ERROR, GET_HENTAI_SERIES} from '../types';


export const getHentaiById = id => async dispatch => {
    try{
        let jwt = localStorage.getItem('token')
        if(jwt == null){
            dispatch({
                type: GET_HENTAI_ERROR,
                payload: 'Account required for hentai'
            })
        }

        axios({
            method: 'get',
            url: `/api/v1/search/hentai/id/${id}`,
            headers: {
                "Authorization" : `Bearer ${jwt}`,
            }
        })
            .then(function (response) {
                dispatch({
                    type: GET_HENTAI_BY_ID,
                    payload: response.data
                })
            })



    }catch(error){
      
        dispatch({
            type: GET_HENTAI_ERROR,
            payload: 'Expired token! please logout and login again'
        });

    }
}


export const getHentai = () => async dispatch => {
    try{

        let jwt = localStorage.getItem('token')
        if(jwt == null){
            dispatch({
                type: GET_HENTAI_ERROR,
                payload: 'Account required for hentai'
            })
        }

       axios({
            method: 'get',
            url: `/api/v1/search/hentai`,
            headers: {
                "Authorization" :  `Bearer ${jwt}`
            }
        })
            .then(function (response) {
                dispatch({
                    type: GET_HENTAI,
                    payload: response.data.hentai
                })
            })
     

    }catch(error){
    
        dispatch({
            type: GET_HENTAI_ERROR,
            payload: 'Expired token! please logout and login again'
        });
        
    }
}


export const searchHentai = ( text ) => async dispatch => {

    try{

        let jwt = localStorage.getItem('token')
        if(jwt == null){
            dispatch({
                type: GET_HENTAI_ERROR,
                payload: 'Account required for hentai'
            })
        }

        axios({
            method: 'get',
            url: `/api/v1/search/hentai/search?text=${text}`,
            headers: {
                "Authorization" :  `Bearer ${jwt}`
            }
        })
              .then(function (response) {
                  dispatch({
                      type: SEARCH_FOR_HENTAI,
                      payload: response.data.hentai
                  })
              })

    }catch(error){

        dispatch({
            type: GET_HENTAI_ERROR,
            payload: 'Expired token! please logout and login again'
        });

    }
}



export const getHentaiSeries = (series) => async dispatch => {
    try{
        console.log(series)
        let jwt = localStorage.getItem('token')
        if(jwt == null){
            dispatch({
                type: GET_HENTAI_ERROR,
                payload: 'Account required for hentai'
            })
        }

        axios({
            method: 'get',
            url: '/api/v1/search/hentai/get-series',
            headers: {
                "Authorization" :  `Bearer ${jwt}`
            },
            params: {
                text: series
            }
        })
            .then(function (response) {
                dispatch({
                    type: GET_HENTAI_SERIES,
                    payload: response.data
                })
            })

    }catch(error){

        dispatch({
            type: GET_HENTAI_ERROR,
            payload: 'Expired token! please logout and login again'
        });

    }
}
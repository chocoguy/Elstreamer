import axios from 'axios';
import { setAlert  } from '../alert/alertActions';
import { ADMIN_UPLOAD_VOD_METADATA, ADMIN_UPLOAD_HENTAI_METADATA, ADMIN_UPLOAD_METADATA_ERROR } from '../types';


export const adminUploadVodMetadata = ({ thumbnail, year, type, title, creator, series, ep, desc, path }) => async dispatch => {
    try{
        let jwt = localStorage.getItem('token')
        if(jwt == null){
            dispatch({
                type: ADMIN_UPLOAD_METADATA_ERROR
            })
        }
        let res = axios({
            method: 'post',
            url: '/api/v1/users/admin',
            headers: {
                "Authorization" : `Bearer ${jwt}`,
                "Content-Type" : 'application/json'
            },
            data: {
                "thumbnail" : thumbnail,
                "year" : year,
                "type" : type,
                "title" : title,
                "creator" : creator,
                "series" : series,
                "ep" : ep,
                "desc" : desc,
                "path" : path
            }
        })

        dispatch({
            type: ADMIN_UPLOAD_VOD_METADATA,
            payload: res.data
        })


        
    }catch(error){
       
        console.log(error)

        dispatch({
            type: ADMIN_UPLOAD_METADATA_ERROR
        });
    }
}




export const adminUploadHentaiMetadata = ({ thumbnail, year, type, title, creator, series, ep, desc, path }) => async dispatch => {
    try{
        let jwt = localStorage.getItem('token')
        if(jwt == null){
            dispatch({
                type: ADMIN_UPLOAD_METADATA_ERROR
            })
        }
        let res = axios({
            method: 'post',
            url: '/api/v1/users/admin/hentai',
            headers: {
                "Authorization" : `Bearer ${jwt}`
            },
            data: {
                "thumbnail" : thumbnail,
                "year" : year,
                "type" : type,
                "title" : title,
                "creator" : creator,
                "series" : series,
                "ep" : ep,
                "desc" : desc,
                "path" : path
            }
        })

        dispatch({
            type: ADMIN_UPLOAD_HENTAI_METADATA,
            payload: res.data
        })


        
    }catch(error){
        
        console.log(error)

        dispatch({
            type: ADMIN_UPLOAD_METADATA_ERROR
        });
    }
}
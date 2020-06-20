import { GET_VOD_BY_ID, GET_VODS, SEARCH_FOR_VOD, SEARCH_FOR_VOD_TYPE, GET_VOD_ERROR, GET_VOD_SERIES } from '../types';

const initialState = {
    vods: [],
    vod: null,
    series: null,
    loading: true,
    error: null
}

const vodsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_VODS:
            return{
                ...state,
                vods: payload,
                loading: false
            };
        case GET_VOD_BY_ID:
            return{
                ...state,
                vod: payload,
                loading: false
            };
        case SEARCH_FOR_VOD_TYPE:
            return{
                ...state,
                vods: payload,
                loading: false
            };
        case SEARCH_FOR_VOD:
            return{
                ...state,
                vods: payload,
                loading: false
            };
        case GET_VOD_SERIES:
            return{
                ...state,
                loading: false,
                series: payload
            }
        case GET_VOD_ERROR:
            return{
                error: payload,
                loading: false
            }
        default:
            return state
    }
}

export default vodsReducer;
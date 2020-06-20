import { GET_HENTAI_BY_ID, GET_HENTAI, SEARCH_FOR_HENTAI, GET_HENTAI_ERROR, GET_HENTAI_SERIES } from '../types';

const initialState = {
    hentais: [],
    hentai: null,
    series: null,
    loading: true,
    error: null
}

const hentaiReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case GET_HENTAI:
            return{
                ...state,
                hentais: payload,
                loading: false
            };
        case GET_HENTAI_BY_ID:
            return{
                ...state,
                hentai: payload,
                loading: false
            }
        case GET_HENTAI_SERIES:
            return{
                ...state,
                series: payload,
                loading: false
            }
        case SEARCH_FOR_HENTAI:
            return{
                ...state,
                hentais: payload,
                loading: false
            }
        case GET_HENTAI_ERROR:
            return{
                loading: false,
                error: payload
            }
        default:
            return state
    }
}

export default hentaiReducer;
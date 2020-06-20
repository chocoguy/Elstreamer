import { ADMIN_UPLOAD_VOD_METADATA, ADMIN_UPLOAD_HENTAI_METADATA, ADMIN_UPLOAD_METADATA_ERROR } from '../types';

const initialState = {
    results: [],
    loading: true,
    error: {}
}

const adminReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case ADMIN_UPLOAD_HENTAI_METADATA:
        case ADMIN_UPLOAD_VOD_METADATA:
            return{
                ...state,
                results: [payload],
                loading: false
            }
        case ADMIN_UPLOAD_METADATA_ERROR:
            return{
                ...state,
                results: payload,
                loading: false
            }
        default:
            return state
    }
}

export default adminReducer
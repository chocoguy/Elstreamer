import { combineReducers } from 'redux';
//import alertReducer from './alert/alertReducer';
//import adminReducer from './admin/adminReducer'
import authReducer from './auth/authReducer';
import hentaiReducer from './hentai/hentaiReducer';
import vodsReducer from './vods/vodsReducer';

const rootReducer = combineReducers({
    //alert: alertReducer,
    //admin: adminReducer,
    auth: authReducer,
    hentai: hentaiReducer,
    vods: vodsReducer,
})

export default rootReducer
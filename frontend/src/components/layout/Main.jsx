import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {loadUser } from '../../redux';
import '../../index.css'

const Main = ({loadUser}) => {
    useEffect(() => {
        loadUser()
    }, []);
    return(
    <div className="landing">
        <h1>Elstreamer... The streamer</h1>
        <br />
        <h1>Elstreamer has tevee shows and vods!</h1>
        <div className="landing-btn">
            <div>
            <a href="/vods"><button>View Catalog</button></a>
            </div>
            <div>
            <a href="/help"><button>Help page</button></a>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {loadUser})(Main);
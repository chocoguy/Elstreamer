import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {loadUser } from '../../redux';


const Help = ({loadUser}) => {
    useEffect(() => {
        loadUser()
    }, []);
    return(
        <div className="help-page">
        <h1>Help</h1>
        <p>If you spot any bugs or have suggestions, please contact me: Edgar@decahex.com</p>
        <p>The code for this website is found here </p>
    </div>
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {loadUser})(Help);
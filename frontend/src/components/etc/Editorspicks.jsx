import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {loadUser } from '../../redux';

const Editorspicks = ({loadUser}) => {
    useEffect(() => {
        loadUser()
    }, []);
    return(
    <div className="help-page">
        <h1>My picks</h1>
        <p>I think you should watch Overflow (Make an acc and click hentai to see it)</p>
    </div>
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {loadUser})(Editorspicks);
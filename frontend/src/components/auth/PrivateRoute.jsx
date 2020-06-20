import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../redux';


loadUser()
const PrivateRoute = ({ component: Component,auth: { isAuthenticated, loading},  ...rest }) => (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (<Component {...props} />)}/>
)

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {loadUser})(PrivateRoute)
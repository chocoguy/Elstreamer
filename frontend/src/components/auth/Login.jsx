import React  from 'react';
import {Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux';
import { loadUser } from '../../redux';
import { Formik, Form, useField } from 'formik';
import { TextField } from '@material-ui/core';
import * as yup from 'yup';

const MyTextField = ({placeholder , ...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return(
      <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText}  />
    )
  };

  const MyPassField = ({placeholder , ...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return(
      <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} type="password"   />
    )
  };

const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required()
})

const Login = ({login, isAuthenticated, loadUser, error}) => {

   
    loadUser()
    if(isAuthenticated) {
        return <Redirect to="/vods" />
    }

    if(error){
        alert(error)
    }
    
    return (
        <div className="login-page">
            <h1>Login!</h1>
        <div className="login-form">
           <Formik validateOnChange={true} initialValues={{ email: '', password: '' }}
           validationSchema={validationSchema}
           onSubmit={(data, { setSubmitting }) => {
               let email = data.email
               let password = data.password
               setSubmitting(true)
               login({email, password})
               console.log(data)
               setSubmitting(false)
               if(isAuthenticated) {
                   return <Redirect to="/vods" />
               }
           }}>
               {({ values, errors, isSubmitting }) => (
                   <div>
                   <Form>
                       <MyTextField placeholder="email" name="email" type="input" as={TextField} />
                       <div />
                       <MyPassField placeholder="password" name="password" type="password" as={TextField} />
                       <div />
                       <button  disabled={isSubmitting} type="submit">Submit</button>
                   </Form>
                   </div>
               )}
           </Formik>
        </div>
        <h1>Don't have an account?</h1>
        <a href="/register"><h2>Register!</h2></a>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.isAuthenticated,
        error: state.auth.error
    }
}

export default  connect(mapStateToProps, {login, loadUser})(Login)

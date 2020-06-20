import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux';
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
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    password2: yup.string().required()
})

const Register = ({register, isAuthenticated,  loadUser, error}) => {
 

    loadUser()
    if(isAuthenticated) {
        return <Redirect to="/vods" />
    }

    if(error){
        alert(error)
    }

    
    return (
        <div className="login-page">
            <h1>Register!</h1>
        <div className="login-form">
           <Formik validateOnChange={true} initialValues={{ name : '', email: '', password: '', password2: '' }}
           validationSchema={validationSchema}
           onSubmit={(data, { setSubmitting }) => {
                  let name = data.name
                 let email = data.email
                 let password = data.password

                if(data.password !== data.password2) {
                    alert('passwords dont match!')
                    setSubmitting(false)
                }else{

               setSubmitting(true)
               register({name, email, password})
               console.log(data.name)
               console.log(data)
               setSubmitting(false)
               if(isAuthenticated) {
                   return <Redirect to="/vods" />
               }
            }
           }}>
               {({ values, errors, isSubmitting }) => (
                   <Form>
                       <MyTextField placeholder="Name" name="name" type="input" />
                       <div />
                       <MyTextField placeholder="Email" name="email" type="input" />
                       <div />
                       <MyPassField placeholder="Password" name="password" type="password" />
                       <div />
                       <MyPassField placeholder="Confirm password" name="password2" type="password" label="password" />
                       <div />
                       <button disabled={isSubmitting} type="submit">Submit</button>
                   </Form>
               )}
           </Formik>
        </div>
        <h1>have an account?</h1>
        <a href="/login"><h2>Login!</h2></a>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.isAuthenticated,
        error: state.auth.error
    }
}


export default connect(mapStateToProps,{ register, loadUser })(Register)
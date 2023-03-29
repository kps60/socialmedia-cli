import React, { useEffect, useState } from 'react'
import { Typography, Avatar, Container, Paper, Grid, Button } from '@material-ui/core'
import LockOutLinedIcon from "@material-ui/icons/LockOpenOutlined"
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode'
import { useHistory } from 'react-router-dom';

import { google, signin, signup } from '../../actions/auth'
import useStyles from "./styles"
import Input from './Input'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
const Auth = () => {

    const classes = useStyles()

    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // const user = localStorage.getItem('profile')
        // formData.add(user._id)
        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }

        console.log(formData)
    }
    const switchMode = () => {
        setIsSignUp(!isSignup);
        setShowPassword(false);
    }
    const googleSuccess = async (res) => {
        // console.log(res);
        const payload = jwtDecode(res?.credential);
        const data = payload
        try {
            dispatch(google(data, history))
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log('Google SignIn was unsuccessful. Try Again later');
        console.log(error);
    }
    
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        if (user) {
            history.push('/posts')
        }
    }, [user])

    return (
        <Container component={'main'} maxWidth='xs' >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        // render={(renderProps) => (
                        //     <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                        //         Google
                        //     </Button>
                        // )}
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                    />
                    <Grid container justifyContent='flex-end' >
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Allready have an account ?Sign In' : 'don\'t have an account ?Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

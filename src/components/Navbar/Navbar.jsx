import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core"
import { SupervisorAccountRounded } from '@material-ui/icons'
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux';


import memories from "../../images/memories2.png"
import useStyles from "./styles"
import { LOGOUT } from '../../constants/actionTypes';
const Navbar = () => {
    const classes = useStyles()
    // const user = null
    // const [user, setUser] = useState(null)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useHistory();
    const dispatch = useDispatch()
    const location = useLocation();

    const handleLogout = () => {
        dispatch({ type: LOGOUT })

        setUser(null)

        history.push('/auth')
    }
    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))

    }, [location])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' variant='h2' align='center' className={classes.heading}>SocialMedia</Typography>
                <img src={memories} className={classes.image} alt="icon" height={'40px'} />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Button component={Link} variant='contained' color='primary' to={`${user ? '/users' : '/auth'}`} >
                            <SupervisorAccountRounded /> My Network
                        </Button>
                        <Avatar className={`${classes.purple}`} alt={user.result.name} src={user.result.profile}>{user.result.name.charAt(0).toUpperCase()}</Avatar>
                        <Typography className={classes.userName} varient='h6'>{user.result.name}</Typography>
                        <Button varient='contained' className={classes.logout} color='secondary' onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' varient='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar >

    )
}

export default Navbar

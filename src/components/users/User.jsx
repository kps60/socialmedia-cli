import React, { useEffect, useState } from 'react'
import { Card, CardMedia, Typography, Button } from '@material-ui/core';
import { Person } from '@material-ui/icons';

import useStyles from '../posts/Post/styles'
import peak from '../../images/peak.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, confirmFriend } from '../../actions/posts';


const User = ({ user }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.users);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [btnText, setBtnText] = useState('Add FRIEND');
    const [num, setNum] = useState(currentUser[0]?.connecting || [])

    useEffect(() => {
        setNum(currentUser[0]?.connecting || [])
        // for(let i = 0; i < currentUser[0]?.connected?.length; i++){
        //     if(user._id=== currentUser[0]?.connected[i]?._id){
        //         setBtnText('Connected');
        //         setBtnDisabled(true);
        //         return;
        //     }
        // }
        if (currentUser[0]?.connected) {
            for (let j = 0; j < currentUser[0]?.connected?.length; j++) {
                if (user._id === currentUser[0]?.connected[j]?.userId) {
                    setBtnText('CONNECTED');
                    setBtnDisabled(true);
                    return;
                }
            }
        }
        for (let i = 0; i < currentUser[0]?.connecting?.length; i++) {
            if (user._id === currentUser[0].connecting[i]?._id) {

                if ((currentUser[0].connecting[i]?.status === true)) {
                    setBtnText('REQUESTED')
                    setBtnDisabled(true)
                }
                if ((currentUser[0].connecting[i]?.status === false)) {
                    setBtnText('Confirm')
                }
                return;
            }
        }

        setBtnText('ADD FRIEND')
        setBtnDisabled(false)
    }, [user, currentUser])

    const handleAddfrnd = async () => {
        dispatch(addFriend(user._id))
        setNum([...num, user._id])
        setBtnText('REQUESTED')
        setBtnDisabled(true);
    }

    const handleConfirmfrnd = () => {
        dispatch(confirmFriend(user._id));
        setBtnText('CONNECTED');
        setBtnDisabled(true);
    }
    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={peak} title={user.email} />
            {user?.profile ? (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: '-34px' }}>
                        <Typography style={{ alignItems: 'center', justifyContent: 'center', width: '50px' }}><img src={user?.profile} alt={user.name} width={'50px'} style={{ borderRadius: '4vh' }} /></Typography>
                    </div>
                </div>
            ) : (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: '-34px' }}>
                        <Typography variant='h4' style={{ alignItems: 'center', justifyContent: 'center', width: '50px', borderRadius: '4vh', background: 'aquamarine' }}><Person style={{ fontSize: 'xxx-large' }} /></Typography>
                    </div>
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography className={classes.name}>{user?.name}</Typography>
                {
                    btnText === 'ADD FRIEND' && (
                        <Button variant='contained' color='primary' disabled={btnDisabled} onClick={handleAddfrnd}>{btnText}</Button>
                    )
                }
                {
                    btnText === 'Confirm' && (
                        <Button variant='contained' color='primary' disabled={btnDisabled} onClick={handleConfirmfrnd}>{btnText}</Button>
                    )
                }
                {
                    btnText === 'REQUESTED' && (
                        <Button variant='contained' color='primary' disabled={btnDisabled}>{btnText}</Button>
                    )

                }
                {
                    btnText === 'CONNECTED' && (
                        <Button variant='contained' color='primary' disabled={btnDisabled}>{btnText}</Button>
                    )

                }
                {/* if (btnText === 'ADD FRIEND') 
                     console.log(user._id)
                     dispatch(addFriend(user._id));
                     
                     if (btnText === 'Confirm') 
                     dispatch(confirmFriend(user._id)) */}


            </div>
        </Card >
    )
}

export default User

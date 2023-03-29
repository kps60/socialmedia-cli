import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';

import useStyles from "./styles"
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory()
  useEffect(() => {
    if (post) setPostData(post);
  }, [post, dispatch])

  const handlesubmit = (e) => {

    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    } else {
      if(FileBase.onDone){
        dispatch(createPost({ ...postData, name: user?.result?.name }, history))
      }
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Unable to load data so please sign In
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handlesubmit}>
        <Typography variant='h6' >{currentId ? 'Editing' : 'Creating'} a Post</Typography>
        <TextField name='title' variant="outlined" label="title" fullWidth value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })} />
        <TextField name='message' variant="outlined" label="Message" fullWidth value={postData.message} onChange={e => setPostData({ ...postData, message: e.target.value })} />
        <TextField name='tags' variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={e => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 || 'https://picsum.photos/200' })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button variant="contained" color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>

    </Paper>
  )
}

export default Form

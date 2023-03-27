import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grid, Grow, AppBar, TextField, Button } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from "material-ui-chip-input"

import Form from '../Form/Form'
import Posts from '../posts/Posts'
import { getPosts, getPostsBySearch, getUsers } from '../../actions/posts'
import useStyles from "./styles"
// import Pagination from '../Pagination'
function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('profile'));

    const [currentId, setCurrentId] = useState(null)

    const query = useQuery();
    const history = useHistory();
    // const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getUsers());
        if (!currentUser) history.push('/auth');
    }, [currentId, dispatch])

    const searchPost = () => {
        if (search.trim() || tags.length > 0) {
            //dispatch => fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));

            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')||'none'}`)

        } else {
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.KeyCode === 13) {//this is for enter key
            //search post
            searchPost();
        }
    }
    const handleDelete = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete))
    }
    const handleAdd = (tag) => setTags([...tags, tag]);

    return (

        <Grow in>
            <Container maxWidth='xl'>
                <Grid container className={classes.gridContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit' >
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Post'
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => { setSearch(e.target.value) }}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                onChange={handleDelete}
                                label='Search Tags with enter'
                                variant='outlined'
                            />
                            <Button className={classes.searchButton} variant='contained' onClick={searchPost} color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {/* <Paper className={classes.pagination} elevation={6}>
                                <Pagination />
                            </Paper> */}
                    </Grid>
                </Grid>
            </Container>
        </Grow>

    )
}

export default Home

import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, COMMENT, FETCH_USERS, FETCH_USER, CURRENT_USER, UPDATE_CURRENTUSER, CONFIRM_FRIENDSHIP, DELETE_FRIENDSHIP } from "../constants/actionTypes"

import * as api from "../api"

//action creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id)
        dispatch({ type: FETCH_POST, payload: data })
        dispatch({ type: END_LOADING })
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        // getUsers();
        const { data } = await api.fetchPosts()
        const action = { type: FETCH_ALL, payload: data }
        dispatch(action);
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })
    }
    catch (error) {
        console.log(error);
    }

}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data })
        
        dispatch({ type: END_LOADING })
        
        // dispatch(getPosts())
    } catch (error) {
        console.log(error);
    }
}
export const updatePost = (_id, post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.updatePost(_id, post)
        dispatch({ type: UPDATE, payload: data })
        // dispatch(getPosts())
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = (_id) => async (dispatch) => {
    try {
        await api.deletePost(_id);

        dispatch({ type: DELETE, payload: _id })
    } catch (error) {
        console.log(error);
    }
}
export const likePost = (_id) => async (dispatch) => {

    try {
        const { data } = await api.likePost(_id);
        // dispatch(getPosts())

        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(value, id);
        dispatch({ type: COMMENT, payload: data })
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.getUsers();
        dispatch({ type: FETCH_USERS, payload: data })
        dispatch({ type: END_LOADING })
        dispatch(currentUser())
    } catch (error) {
        console.log(error);
    }
}

export const addFriend = (id) => async (dispatch) => {
    try {
        const { data } = await api.addFriend(id);
        dispatch({ type: FETCH_USER, payload: data })
        dispatch({ type: UPDATE_CURRENTUSER, payload: data })
        dispatch(getUsers())
    } catch (error) {
        console.log(error);
    }
}
export const currentUser = () => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch({ type: CURRENT_USER, payload: user })
    } catch (error) {
        console.log(error);
    }
}
export const confirmFriend = (id) => async (dispatch) => {
    try {
        const { data } = await api.confirmFriend(id);
        dispatch({ type: CONFIRM_FRIENDSHIP, payload: data })

    } catch (error) {
        console.log(error);
    }
}
export const deleteFriend = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteFriend(id);
        dispatch({ type: CURRENT_USER, payload: data });
    } catch (error) {
        console.log(error);
    }
    
}
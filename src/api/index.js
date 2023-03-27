import axios from "axios"

const API = axios.create({ baseURL: 'https://socialmedia-dk.azurewebsites.net' })
// 'https://socialmedia-dk.azurewebsites.net'
// 'http://localhost:5000/'
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

// const url = 'http://localhost:5000/posts'

export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = () => API.get('/posts')
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`);
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const commentPost = (value, id) => API.post(`/posts/${id}/commentPost`, { value })


export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const google = (formData) => API.post('/users/google', formData);

export const getUsers = () => API.get('/users');
export const addFriend = (id) => API.patch('/users/mynetwork/request', { id });
export const currentUser = (id) => API.get(`/users/${id}`);
export const confirmFriend = (id, frndId) => API.patch(`/users/mynetwork/confirm/${id}`);


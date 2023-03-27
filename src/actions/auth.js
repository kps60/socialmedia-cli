import { AUTH } from "../constants/actionTypes"

import * as api from "../api"
import { currentUser } from "./posts"

export const signin = (formData, history) => async (dispatch) => {
    try {

        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, data })
        currentUser()
        history.push('/')

    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // signup the user
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, data })
        currentUser()
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}
export const google = (formData, history) => async (dispatch) => {
    try {
        // const { name, email, picture, sub } = formData.result;
        // console.log(name, email, picture, sub)
        const { data } = await api.google(formData);
        // console.log(data)
        dispatch({ type: AUTH, data })
        currentUser()
        history.push('/')

    } catch (err) {
        console.log(err)
    }
}

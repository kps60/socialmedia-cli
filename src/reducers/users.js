import { FETCH_USERS, START_LOADING, END_LOADING, FETCH_USER, CURRENT_USER, UPDATE_CURRENTUSER, CONFIRM_FRIENDSHIP, DELETE_FRIENDSHIP } from "../constants/actionTypes";


export default (state = { isLoading: true, users: [], currentUser: [] }, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case CURRENT_USER:
            return { ...state, currentUser: state.users?.filter(use => use._id === action.payload.result._id) }
        case DELETE_FRIENDSHIP:
            return { ...state, currentUser: state.currentUser.connected.filter(use => use.userId !== action.payload.id) };
        case UPDATE_CURRENTUSER:
            return { ...state, currentUser: action.payload }
        case FETCH_USER, CONFIRM_FRIENDSHIP:
            return { ...state, users: state.users.map(user => user._id === action.payload._id ? action.payload : user) }
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        default:
            return state;
    }
}

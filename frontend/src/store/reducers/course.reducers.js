import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    courses: []
}

export default function courseReducers(state = initialState, action) {
    switch(action.type){
        case types.SUCCESS_GET_COURSES:
            return {...state, isLoading: false, courses: action.payload};
        case types.FAILURE_GET_COURSES:
            alert('Ведутся технические работы, попробуйте позже');
            return state;
        default:
            return state;
    }
}
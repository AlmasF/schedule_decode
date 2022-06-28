import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    errors: null,
    lessons: []
}

export default function lessonReducers(state = initialState, action) {
    switch(action.type){
        case types.CREATE_LESSON_IN_WEEK:
            return {...state, isLoading: true};
        case types.SUCCESS_CREATE_LESSON_IN_WEEK:
            return {...state, isLoading: false, lessons: [...state.lessons, action.payload]};
        case types.FAILURE_CREATE_LESSON_IN_WEEK:
            alert(JSON.stringify(action.error));
            return {...state, isLoading: false, errors: action.errors};
        default:
            return state;
    }
}
import * as types from '../actions/types';
import { removeById, updateLessonInWeek } from './utils';

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
            return {...state, isLoading: false, errors: action.errors};
        case types.SUCCESS_DELETE_LESSON_IN_WEEK:
            return {...state, lessons: removeById(state.lessons, action.payload.id)};
        case types.FAILURE_DELETE_LESSON_IN_WEEK:
            alert('Ведутся технические работы. Попробуйте позже!');
            return state;
        case types.UPDATE_LESSON_IN_WEEK:
            return {...state, isLoading: true};
        case types.SUCCESS_UPDATE_LESSON_IN_WEEK:
            return {...state, isLoading: false, lessons: updateLessonInWeek(state.lessons, action.payload)};
        case types.FAILURE_UPDATE_LESSON_IN_WEEK:
            alert('Ведутся технические работы. Попробуйте позже!');
            return {...state, isLoading: false};
        default:
            return state;
    }
}
import * as types from '../actions/types';
import { removeById } from './utils';

const initialState = {
    // isLoading: false,
    list: [],
    autoCompleteData: {}
}

export default function searchReducers(state = initialState, action) {
    switch(action.type){
        case types.SUCCESS_SEARCH_LESSONS:
            return {...state, list: action.payload};
        case types.FAILURE_SEARCH_LESSONS:
            alert('Ведутся технические работы. Попробуйте позже!');
            return state;
        case types.SUCCESS_AUTO_COMPLETE:
            return {...state, autoCompleteData: action.payload};
        case types.FAILURE_AUTO_COMPLETE:
            alert('Ведутся технические работы. Попробуйте позже!');
            return state;
        case types.SUCCESS_CREATE_LESSON_IN_WEEK:
            return {...state, isLoading: false, list: [...state.list, ...action.payload]};
        case types.SUCCESS_DELETE_LESSON_IN_WEEK:
            return {...state, list: removeById(state.list, action.payload.id)};
        default:
            return state;
    }
}
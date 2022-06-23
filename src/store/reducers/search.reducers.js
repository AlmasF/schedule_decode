import * as types from '../actions/types';

const initialState = {
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
        default:
            return state;
    }
}
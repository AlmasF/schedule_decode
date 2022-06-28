import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    rooms: []
}

export default function roomReducers(state = initialState, action) {
    switch(action.type){
        case types.SUCCESS_GET_ROOMS:
            return {...state, isLoading: false, activeGroups: action.payload};
        case types.FAILURE_GET_ROOMS:
            alert('Ведутся технические работы. Попробуйте позже!');
            return state;
        default:
            return state;
    }
}
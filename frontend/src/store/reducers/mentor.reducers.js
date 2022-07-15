import * as types from '../actions/types';
import { removeById, updateMentor } from './utils';

const initialState = {
    isLoading: false,
    mentors: []
}

export default function mentorReducers(state = initialState, action) {
    switch(action.type){
        case types.SUCCESS_GET_MENTORS:
            return {...state, isLoading: false, mentors: action.payload};
        case types.FAILURE_GET_MENTORS:
            alert('Ведутся технические работы. Попробуйте позже!');
            // alert(JSON.stringify(action.error));
            return state;
        case types.CREATE_MENTOR:
            return {...state, isLoading: true};
        case types.SUCCESS_CREATE_MENTOR:
            return {...state, isLoading: false, mentors: [...state.mentors, action.payload]};
        case types.FAILURE_CREATE_MENTOR:
            alert(JSON.stringify(action.error));
            return {...state, isLoading: false};
        case types.SUCCESS_DELETE_MENTOR:
            return {...state, mentors: removeById(state.mentors, action.payload.id)};
        case types.FAILURE_DELETE_MENTOR:
            alert('Ведутся технические работы. Попробуйте позже!');
            return state;
        case types.UPDATE_MENTOR:
            return {...state, isLoading: true};
        case types.SUCCESS_UPDATE_MENTOR:
            return {...state, isLoading: false, mentors: updateMentor(state.mentors, action.payload)};
        case types.FAILURE_UPDATE_MENTOR:
            alert('Ведутся технические работы. Попробуйте позже!');
            return {...state, isLoading: false};
        default:
            return state;
    }
}


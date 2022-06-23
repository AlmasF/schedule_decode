import * as types from '../actions/types';
import { removeById } from './utils';

const initialState = {
    isLoading: false,
    groups: []
}

export default function groupReducers(state = initialState, action) {
    switch(action.type){
        case types.SUCCESS_GET_GROUPS:
            return {...state, isLoading: false, groups: action.payload};
        case types.FAILURE_GET_GROUPS:
            alert('Ведутся технические работы. Попробуйте позже!');
            // alert(JSON.stringify(action.error));
            return state;
        case types.CREATE_GROUP:
            return {...state, isLoading: true};
        case types.SUCCESS_CREATE_GROUP:
            return {...state, isLoading: false, groups: [...state.groups, action.payload]};
        case types.FAILURE_CREATE_GROUP:
            alert(JSON.stringify(action.error));
            return {...state, isLoading: false};
        case types.SUCCESS_DELETE_GROUP:
            return {...state, groups: removeById(state.groups, action.payload.id)};
        case types.FAILURE_DELETE_GROUP:
            alert('Ведутся технические работы. Попробуйте позже!');
            return state;
        case types.UPDATE_GROUP:
            return {...state, isLoading: true};
        case types.SUCCESS_UPDATE_GROUP:
            return {...state, isLoading: false, groups: updateGroup(state.groups, action.payload)};
        case types.FAILURE_UPDATE_GROUP:
            alert('Ведутся технические работы. Попробуйте позже!');
            return {...state, isLoading: false};
        default:
            return state;
    }
}

function updateGroup(arr, group){
    
    group.start = group.start.toString();
    group.end = group.end.toString();

    // return arr;
    // let arrNew = arr.map(record => record.id === group.id ? group : record);
    return arr.map(record => record.id === group.id ? group : record);
}
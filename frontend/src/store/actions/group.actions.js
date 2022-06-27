import * as types from './types';

export function getActiveGroups(){
    return {type: types.GET_ACTIVE_GROUPS};
}

export function getGroups(){
    return {type: types.GET_GROUPS};
}

export function createGroup(data){
    return {...data, type: types.CREATE_GROUP};
}

export function deleteGroup(id){
    return {id, type: types.DELETE_GROUP};
}

export function updateGroup(data){
    return {...data, type: types.UPDATE_GROUP};
}
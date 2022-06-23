import * as types from './types';

export function getMentors(){
    return {type: types.GET_MENTORS};
}

export function createMentor(name){
    return {name, type: types.CREATE_MENTOR};
}

export function deleteMentor(id){
    return {id, type: types.DELETE_MENTOR};
}

export function updateMentor(data){
    return {...data, type: types.UPDATE_MENTOR};
}
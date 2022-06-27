import * as types from './types';

export function getCourses(){
    return {type: types.GET_GROUPS};
}

export function createCourse(data){
    return {...data, type: types.CREATE_GROUP};
}

export function deleteCourse(id){
    return {id, type: types.DELETE_GROUP};
}

export function updateCourse(data){
    return {...data, type: types.UPDATE_GROUP};
}
import * as types from './types';

export function createLesson(data){
    return {type: types.CREATE_LESSON_IN_WEEK, data};
}

export function deleteLesson(id){
    return {id, type: types.DELETE_LESSON_IN_WEEK};
}

export function updateLesson(data){
    return {...data, type: types.UPDATE_LESSON_IN_WEEK};
}

export function createBusy(data){
    return {type: types.CREATE_BUSY_IN_WEEK, data};
}

export function deleteBusy(id){
    return {id, type: types.DELETE_BUSY_IN_WEEK};
}

export function updateBusy(data){
    return {...data, type: types.UPDATE_BUSY_IN_WEEK};
}
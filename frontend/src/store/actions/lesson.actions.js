import * as types from './types';

export function createLesson(data){
    return {type: types.CREATE_LESSON_IN_WEEK, data};
}
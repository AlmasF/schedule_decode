import * as types from './types';

export function searchLessons(data) {
    return {type: types.SEARCH_LESSONS, data};
}

export function autoCompleteFunc(key) {
    return {type: types.AUTO_COMPLETE, key}
}
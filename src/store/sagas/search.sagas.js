import {all, put, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios';
import { BASE_URL } from '../../config/base-url';

function* searchLessons({data}){
    try {
        const activities = yield axios.get(`${BASE_URL}/api/search?${data.key}=${data.value}`).then(res => res.data);
        yield put({type: types.SUCCESS_SEARCH_LESSONS, payload: activities});
    } catch (error) {
        yield put({type: types.FAILURE_SEARCH_LESSONS, error});
    }
}

function* autoCompleteFunc({key}){
    const autoCompleteData = yield axios.get(`${BASE_URL}/api/search/${key}`).then(res => res.data);
    try {
        yield put({type: types.SUCCESS_AUTO_COMPLETE, payload: autoCompleteData});
    } catch (error) {
        yield put({type: types.FAILURE_AUTO_COMPLETE, error});
    }
}

export function* searchSagas(){
    yield all([
        yield takeLatest(types.SEARCH_LESSONS, searchLessons),
        yield takeLatest(types.AUTO_COMPLETE, autoCompleteFunc),
    ])
}

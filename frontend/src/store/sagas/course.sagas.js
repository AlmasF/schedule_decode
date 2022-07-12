import {all, put, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios';
import { BASE_URL } from '../../config/base-url';

function* getCourses(){
    try {
        const courses = yield axios.get(`${BASE_URL}/api/courses`).then(res => res.data);
        yield put({type: types.SUCCESS_GET_COURSES, payload: courses});
    } catch (error) {
        yield put({type: types.FAILURE_GET_COURSES, error});
    }
}

export function* courseSagas(){
    yield all([
        yield takeLatest(types.GET_COURSES, getCourses),
    ])
}
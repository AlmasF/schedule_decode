import {all, put, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios';
import { BASE_URL } from '../../config/base-url';

function* createLesson({data}){
    try {
        const lessons = yield axios.post(`${BASE_URL}/api/lesson-in-week`, data).then(res => res.data);
        console.log(lessons);
        yield put({type: types.SUCCESS_CREATE_LESSON_IN_WEEK, payload: lessons});
    } catch (errors) {
        yield put({type: types.FAILURE_CREATE_LESSON_IN_WEEK, errors: errors.response.data});
    }
}

function* deleteLesson(id){
    try {
        yield axios.delete(`${BASE_URL}/api/lesson-in-week/${id}`).then(res => res.data);
        yield put({type: types.SUCCESS_DELETE_LESSON_IN_WEEK, payload: {id}})
    } catch (error) {
        yield put({type: types.FAILURE_DELETE_LESSON_IN_WEEK, error})
    }
}

export function* lessonSagas(){
    yield all([
        yield takeLatest(types.CREATE_LESSON_IN_WEEK, createLesson),
        yield takeLatest(types.DELETE_LESSON_IN_WEEK, deleteLesson),
    ])
}
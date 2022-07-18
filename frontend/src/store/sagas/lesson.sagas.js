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

function* deleteLesson(data){
    try {
        const id = data.id;
        yield axios.delete(`${BASE_URL}/api/lesson-in-week/${id}`).then(res => res.data);
        yield put({type: types.SUCCESS_DELETE_LESSON_IN_WEEK, payload: {id}})
    } catch (error) {
        yield put({type: types.FAILURE_DELETE_LESSON_IN_WEEK, error})
    }
}

function* updateLesson({id, time, weekday, mentor_id, room_id}){
    try {
        yield axios.put(`${BASE_URL}/api/lesson-in-week`, {id, time, weekday, mentor_id, room_id}).then(res => res.data);
        yield put({type: types.SUCCESS_UPDATE_LESSON_IN_WEEK, payload: {id, time, weekday, mentor_id, room_id}})
    } catch (error) {
        yield put({type: types.FAILURE_UPDATE_LESSON_IN_WEEK, error})
    }
}

export function* lessonSagas(){
    yield all([
        yield takeLatest(types.CREATE_LESSON_IN_WEEK, createLesson),
        yield takeLatest(types.DELETE_LESSON_IN_WEEK, deleteLesson),
        yield takeLatest(types.UPDATE_LESSON_IN_WEEK, updateLesson),
    ])
}
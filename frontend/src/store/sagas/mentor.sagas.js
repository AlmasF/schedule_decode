import {all, put, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios';
import { BASE_URL } from '../../config/base-url';

function* getMentors(){
    try {
        const mentors = yield axios.get(`${BASE_URL}/api/mentors`).then(res => res.data);
        yield put({type: types.SUCCESS_GET_MENTORS, payload: mentors});
    } catch (error) {
        yield put({type: types.FAILURE_GET_MENTORS, error});
    }
}

function* createMentor({name}){
    try {
        const mentor = yield axios.post(`${BASE_URL}/api/mentors`, {full_name: name}).then(res => res.data);
        yield put({type: types.SUCCESS_CREATE_MENTOR, payload: mentor})
    } catch (error) {
        yield put({type: types.FAILURE_CREATE_MENTOR, error})
    }
}

function* deleteMentor({id}){
    try {
        yield axios.delete(`${BASE_URL}/api/mentors/${id}`).then(res => res.data);
        yield put({type: types.SUCCESS_DELETE_MENTOR, payload: {id}})
    } catch (error) {
        yield put({type: types.FAILURE_DELETE_MENTOR, error})
    }
}

function* updateMentor({id, name}){
    try {
        yield axios.put(`${BASE_URL}/api/mentors`, {id, full_name: name}).then(res => res.data);
        yield put({type: types.SUCCESS_UPDATE_MENTOR, payload: {id, full_name: name}})
    } catch (error) {
        yield put({type: types.FAILURE_UPDATE_MENTOR, error})
    }
}

export function* mentorSagas(){
    yield all([
        yield takeLatest(types.GET_MENTORS, getMentors),
        yield takeLatest(types.CREATE_MENTOR, createMentor),
        yield takeLatest(types.DELETE_MENTOR, deleteMentor),
        yield takeLatest(types.UPDATE_MENTOR, updateMentor)
    ])
}
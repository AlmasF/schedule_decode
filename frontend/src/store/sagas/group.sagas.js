import {all, put, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios';
import { BASE_URL } from '../../config/base-url';

function* getActiveGroups(){
    try {
        const groups = yield axios.get(`${BASE_URL}/api/groups/filter/active`).then(res => res.data);
        yield put({type: types.SUCCESS_GET_ACTIVE_GROUPS, payload: groups});
    } catch (error) {
        yield put({type: types.FAILURE_GET_ACTIVE_GROUPS, error});
    }
}

function* getGroups(){
    try {
        const groups = yield axios.get(`${BASE_URL}/api/groups`).then(res => res.data);
        yield put({type: types.SUCCESS_GET_GROUPS, payload: groups});
    } catch (error) {
        yield put({type: types.FAILURE_GET_GROUPS, error});
    }
}

function* createGroup({name, start, end}){
    try {
        const group = yield axios.post(`${BASE_URL}/api/groups`, {name, start, end}).then(res => res.data);
        yield put({type: types.SUCCESS_CREATE_GROUP, payload: group})
    } catch (error) {
        yield put({type: types.FAILURE_CREATE_GROUP, error})
    }
}

function* deleteGroup({id}){
    try {
        yield axios.delete(`${BASE_URL}/api/groups/${id}`).then(res => res.data);
        yield put({type: types.SUCCESS_DELETE_GROUP, payload: {id}})
    } catch (error) {
        yield put({type: types.FAILURE_DELETE_GROUP, error})
    }
}

function* updateGroup({id, name, start, end}){
    try {
        yield axios.put(`${BASE_URL}/api/groups`, {id, name, start, end}).then(res => res.data);
        yield put({type: types.SUCCESS_UPDATE_GROUP, payload: {id, name, start, end}})
    } catch (error) {
        yield put({type: types.FAILURE_UPDATE_GROUP, error})
    }
}

export function* groupSagas(){
    yield all([
        yield takeLatest(types.GET_ACTIVE_GROUPS, getActiveGroups),
        yield takeLatest(types.GET_GROUPS, getGroups),
        yield takeLatest(types.CREATE_GROUP, createGroup),
        yield takeLatest(types.DELETE_GROUP, deleteGroup),
        yield takeLatest(types.UPDATE_GROUP, updateGroup)
    ])
}
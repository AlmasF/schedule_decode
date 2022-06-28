import {all, put, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios';
import { BASE_URL } from '../../config/base-url';

function* getRooms(){
    try {
        const rooms = yield axios.get(`${BASE_URL}/api/rooms`).then(res => res.data);
        yield put({type: types.SUCCESS_GET_ROOMS, payload: rooms});
    } catch (errors) {
        yield put({type: types.FAILURE_GET_ROOMS, errors})
    }
}

export function* roomSagas(){
    yield all([
        yield takeLatest(types.GET_ROOMS, getRooms)
    ])
}
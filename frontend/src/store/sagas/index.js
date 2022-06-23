import {all} from 'redux-saga/effects';

import { mentorSagas } from './mentor.sagas';
import { groupSagas } from './group.sagas';
import { searchSagas } from './search.sagas';

export default function* rootSaga(){
    yield all([
        mentorSagas(),
        groupSagas(),
        searchSagas()
    ])
}
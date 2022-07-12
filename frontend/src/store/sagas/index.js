import {all} from 'redux-saga/effects';

import { mentorSagas } from './mentor.sagas';
import { groupSagas } from './group.sagas';
import { searchSagas } from './search.sagas';
import { lessonSagas } from './lesson.sagas';
import { roomSagas } from './room.sagas';
import { courseSagas } from './course.sagas';

export default function* rootSaga(){
    yield all([
        mentorSagas(),
        groupSagas(),
        searchSagas(),
        lessonSagas(),
        roomSagas(),
        courseSagas()
    ])
}
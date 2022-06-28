import { combineReducers } from "redux";
import mentorReducers from "./mentor.reducers";
import groupReducers from "./group.reducers";
import searchReducers from "./search.reducers";
import lessonReducers from "./lesson.reducers";
import roomReducers from "./room.reducers";

export default combineReducers({
    mentorReducers,
    groupReducers,
    searchReducers,
    lessonReducers,
    roomReducers
})
import { combineReducers } from "redux";
import mentorReducers from "./mentor.reducers";
import groupReducers from "./group.reducers";
import searchReducers from "./search.reducers";

export default combineReducers({
    mentorReducers,
    groupReducers,
    searchReducers
})
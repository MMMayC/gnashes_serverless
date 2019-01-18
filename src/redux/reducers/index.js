import { combineReducers } from "redux";
import candidatesReducers from "./candidatesReducers";
import votesReducers from "./votesReducers";

const rootReducer = combineReducers({
    candidates: candidatesReducers,
    votes: votesReducers
});

export default rootReducer;
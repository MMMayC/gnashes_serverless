import { GET_CANDIDATES, UPDATE_CURRENT_CANDIDATE } from "../actions/candidatesActions";

export default function condidatesReducers( state = {candidates: [], currentCandidate: null}, action) {
  switch (action.type) {
    case GET_CANDIDATES:
      return Object.assign({}, state, {
        candidates: [...action.candidates]
      });
    case UPDATE_CURRENT_CANDIDATE:
      return Object.assign({}, state, {
        currentCandidate: action.currentCandidate
      })
    default:
      return state
  }
}

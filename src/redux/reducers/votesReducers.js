import { GET_VOTES, POST_VOTE } from "../actions/votesActions";

export default function condidatesReducers( state = {votes: [], gnashes: null}, action) {
  switch (action.type) {
    case GET_VOTES:
      return Object.assign({}, state, {
        votes: [...action.votes],
        gnashes: action.gnashes
      });
    case POST_VOTE:
      return Object.assign({}, state, {
        votes: [...state.votes, action.vote]
      });
    default:
      return state
  }
}

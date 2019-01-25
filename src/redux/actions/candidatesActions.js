import axios from "axios";
export const GET_CANDIDATES = "GET_CANDIDATES";
export const UPDATE_CURRENT_CANDIDATE = "UPDATE_CURRENT_CANDIDATE";

export function getCandidates() {
  return dispatch => {
    axios.get("https://qmz6liupqh.execute-api.us-east-1.amazonaws.com/dev/candidates").then(res => {
      dispatch({
        type: GET_CANDIDATES,
        candidates: res.data
      });
    }).catch(err => {
      console.log("Get candidates action: ", err);
    });
  }
}

export function updateCurrentCandidate(candidate) {
  return dispatch => {
      dispatch({
        type: UPDATE_CURRENT_CANDIDATE,
        currentCandidate: candidate
      });
  }
}
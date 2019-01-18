import axios from "axios";
import _ from "lodash";

export const GET_VOTES = "GET_VOTES";
export const POST_VOTE = "POST_VOTE";

export function getVotes(from, to) {
  return dispatch => {
    axios.get("/votes", {
      params: {
        from: from,
        to: to
      }
    }).then(res => {
      const groupedVotes = _.groupBy(res.data, vote => {
        return vote.candidate;
      });
      const votesLength = Object.values(groupedVotes).map(vote => {
        return vote.length;
      });
      const maxVote = votesLength.indexOf(Math.max(...votesLength));
      const gnashes = Object.keys(groupedVotes)[maxVote];
      console.log('gnashes :', gnashes);
      dispatch({
        type: GET_VOTES,
        votes: res.data,
        gnashes: gnashes
      });
    }).catch(err => {
      console.log("Get vote action: ", err);
    });
  }
}

export function postVote(vote) {
  return (dispatch) => {
    axios.post("/vote", vote).then(res => {
      dispatch({
        type: POST_VOTE,
        vote: vote
      });
    }).catch(err => {
      console.log("Post vote action: ", err);
    });
  }
}
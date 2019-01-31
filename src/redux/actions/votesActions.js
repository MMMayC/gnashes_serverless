import axios from "axios";
import _ from "lodash";

export const GET_VOTES = "GET_VOTES";
export const POST_VOTE = "POST_VOTE";

function getAllIndexes(arr, val) {
  var indexes = [], i;
  for(i = 0; i < arr.length; i++)
      if (arr[i] === val)
          indexes.push(i);
  return indexes;
}

export function getVotes(from, to) {
  return dispatch => {
    axios.get("https://mxi41j970j.execute-api.us-east-1.amazonaws.com/dev/votes", {
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
      let max = Math.max(...votesLength);
      let gnashesIndexes = getAllIndexes(votesLength, max);
      let gnashes = [];
      for (let a = 0; a < gnashesIndexes.length; a ++) {
        gnashes.push(Object.keys(groupedVotes)[gnashesIndexes[a]]);
      };
      // const maxVote = votesLength.indexOf(Math.max(...votesLength));
      // const gnashes = Object.keys(groupedVotes)[maxVote];
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
    axios.post("https://mxi41j970j.execute-api.us-east-1.amazonaws.com/dev/vote", vote).then(res => {
      dispatch({
        type: POST_VOTE,
        vote: vote
      });
    }).catch(err => {
      console.log("Post vote action: ", err);
    });
  }
}
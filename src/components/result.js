import React, {Component} from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { getVotes, getGnashes } from "../redux/actions/votesActions"
import { getCandidates } from "../redux/actions/candidatesActions"
import Header from "./header"
import Votes from "./votes"
import ChooseDate from "./chooseDate";
import Vote from "./vote";

class Result extends Component {
  componentDidMount() {
    this.props.getCandidates();
  }

  render() {
    return (
       <div>
         <Header />
         <div className="Result">
          {
            this.props.votes == null ?
              <ChooseDate /> :
              this.props.votes.length < 1 ?
                <div><div className="Message-Error">No valid votes during the dates, please try again</div><ChooseDate /></div> :
                <Votes />
            }
          </div>
       </div>
    );
  }
}
 
function mapStateToProps(state) {
  const { votes, gnashes } = state.votes;
  const { candidates } = state.candidates;
  return {
    votes,
    candidates,
    gnashes
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getVotes: getVotes,
    getCandidates: getCandidates,
  }, dispatch)
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Result)
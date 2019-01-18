import React, {Component} from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { getCandidates } from "../redux/actions/candidatesActions"
import { getVotes } from "../redux/actions/votesActions"

import Candidates from "./candidates"
import Header from "./header"
import NomimateForm from "./nominateForm"


class Nomination extends Component {

  componentDidMount() {
    this.props.getCandidates();
  }


  render() {
    const { candidates, currentCandidate } = this.props
    return (
       <div>
         <Header />
         <Candidates candidates={candidates} />
         <NomimateForm currentCandidate={currentCandidate} />
       </div>
    );
  }
}
 
function mapStateToProps(state) {
  const { candidates, currentCandidate } = state.candidates
  return {
    candidates,
    currentCandidate
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getCandidates: getCandidates
  }, dispatch)
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Nomination)

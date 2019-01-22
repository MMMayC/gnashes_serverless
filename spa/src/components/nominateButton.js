import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { updateCurrentCandidate } from "../redux/actions/candidatesActions";

class NominateButton extends Component {
  constructor(props) {
    super(props);
    this.openNominateForm = this.openNominateForm.bind(this);
    this.nominateFormElement = document.querySelector(".NominateForm");
  }
  openNominateForm() {
    this.props.updateCurrentCandidate(this.props.candidate);
    this.nominateFormElement.setAttribute("style", "display: block;");
  }
  render() {
    return (
      <button className="Button NominateButton" onClick={this.openNominateForm}>
        <i className="fas fa-trophy"></i>
        Nominate
      </button>
    );
  }
}
function mapStateToProps(state) {
  const { isFetching, candidates, currentCandidate } = state;
  return {
    isFetching,
    candidates,
    currentCandidate
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateCurrentCandidate: updateCurrentCandidate
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(NominateButton);
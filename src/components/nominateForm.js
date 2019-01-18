import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postVote } from "../redux/actions/votesActions"
import Candidate from "./candidate";

class NominateForm extends Component {
    constructor(props){
        super(props);
        this.closeNominateForm = this.closeNominateForm.bind(this);
        this.submitNomination = this.submitNomination.bind(this);
        this.onSuccessAnimation = this.onSuccessAnimation.bind(this);
    }
    componentDidMount() {
        this.nominateFormElement = document.querySelector(".NominateForm");
        this.onSuccessElement = document.querySelector(".NominateForm-onSuccess");
        this.formElement = document.querySelector(".NominateForm-Form");
        this.onSuccessCopyElement = document.querySelector(".NominateForm-onSuccess-Copy");
    }
    closeNominateForm() {
        this.nominateFormElement.setAttribute("style", "display: none;");
    }
    submitNomination(e) {
        e.preventDefault();
        const nomination = {
            candidate: this.props.currentCandidate.name,
            value: findDOMNode(this.refs.value).value,
            achievement: findDOMNode(this.refs.achievement).value,
            timestamp: new Date()
        };
        this.props.postVote(nomination);
        this.onSuccessAnimation();
    }
    onSuccessAnimation() {
        this.onSuccessElement.classList.add("NominateForm-onSuccess--Active");
        this.formElement.classList.add("hide");
        this.onSuccessCopyElement.classList.add("show");
        setTimeout(() => { 
            this.onSuccessElement.classList.remove("NominateForm-onSuccess--Active");
            this.onSuccessCopyElement.classList.remove("show");
            this.closeNominateForm();
            this.formElement.classList.remove("hide");
        }, 3000);
    }
    
  render() {
    return (
        <div className="NominateForm Modal">
            <form className="NominateForm-Form Form">
                {this.props.currentCandidate != null ? <Candidate candidate={this.props.currentCandidate} /> : ""}
                <label className="Form-Label NominateForm-Form-Label NominateForm-Value-Label">Value</label>
                <select className="Form-Input NominateForm-Form-Value-Select" ref="value">
                    <option value="fun">Fun</option>
                    <option value="respectable">Respectable</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="curious">Curious</option>
                    <option value="artisan">Artisan</option>
                </select>
                <label className="Form-Label NominateForm-Form-Label NominateForm-Form-Achievement-Label">Achievement</label>
                <textarea className="Form-Input NominateForm-Form-Achievement-Textarea" ref="achievement"></textarea>
                <input type="submit" className="Button Form-Input Form-Submit NominateForm-Form-Submit" onClick={this.submitNomination}/>
                <a className="NominateForm-Form-Cancel" onClick={this.closeNominateForm}>Cancel</a>
            </form>
            <div className="NominateForm-onSuccess">
                <svg className="Tick-Icon" version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 37 37">
                    <path className="circ path" d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z" />
                    <polyline className="tick path" points="11.6,20 15.9,24.2 26.4,13.8 " />
                </svg>
                <div className="NominateForm-onSuccess-Copy">Nomination Submitted</div>
            </div>
        </div>
    );
  }

}

function mapStateToProps(state) {
    const { votes } = state.votes
    return {
      votes
    }
  }
  function mapDispatchToProps(dispatch){
    return bindActionCreators({
      postVote: postVote
    }, dispatch)
  }
   
export default connect(mapStateToProps, mapDispatchToProps)(NominateForm)

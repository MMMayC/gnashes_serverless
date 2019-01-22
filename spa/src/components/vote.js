import React, {Component} from "react";
import Candidate from "./candidate";

class Vote extends Component {
  render() {
    return (
      <div className="Vote Modal">
        <div className="Vote-Candidate">
          <Candidate candidate={this.props.candidate} />
        </div>
        <div className="Vote-Details">
          <div className="Vote-Details-Value">
            <h3>Value</h3>
            <p>{this.props.vote.value}</p>
          </div>
          <div className="Vote-Details-Achievement">
            <h3>Achievement</h3>
            <p>{this.props.vote.achievement}</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Vote;

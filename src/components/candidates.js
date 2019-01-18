import React, {Component} from "react";
import NominateButton from "./nominateButton";
import Candidate from "./candidate";

class Candidates extends Component {
  render() {
    return(
      <div className="Candidates"> 
        <h1 className="Candidates-Heading">Who is the best?</h1>
        {
          this.props.candidates && this.props.candidates !=[] ?
          this.props.candidates.map(candidate => {
            return(
              <Candidate candidate={candidate}>
                <NominateButton candidate={candidate} />
              </Candidate>
            )
          })
          : ""
        }
    </div>
    )
  }
}


export default Candidates;

import React, {Component} from "react";
import Candidate from "./candidate";
import { connect } from "react-redux";

class Gnashes extends Component {
  render() {
    return (
      <div className="Gnashes Modal">
        <img src="img/gnashes.png" className="Gnashes-Trophy" />
        {this.props.candidates && this.props.candidates != [] ?
        this.props.candidates.map(candidate => {
          return <Candidate candidate={candidate} />
        }) :
        ""
      }
      </div>
    );
  }

}

function mapStateToProps(state) {
    const { gnashes } = state.votes
    return {
      gnashes
    }
}
   
export default connect(mapStateToProps)(Gnashes);
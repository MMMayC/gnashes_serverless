import React, {Component} from "react";
import Candidate from "./candidate";
import { connect } from "react-redux";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.getCount = this.getCount.bind(this);
    this.state = {
      fishes: []
    };
  }
  componentDidMount() {
      if(this.props.gnashes) {
        this.interval = setInterval(() => {
          this.setState({
            fishes: this.randomCount()
          })
        }, 100);
      }
  }
  getCount() {
    let fishes = [];
    for(let i = 0; i < this.props.voteCount; i ++) {
      fishes.push(<div className="Overview-VoteCount-Fish"><i className='fas fa-fish' key={i}></i></div>);
    }
    return fishes;
  }
  randomCount() {
    let fishes = this.state.fishes;
    if(fishes.length < 1) {
      fishes.push(<div className="Overview-VoteCount-Fish"><i className='fas fa-fish'></i></div>);
    } else if(fishes.length > 7) {
      fishes.pop(<div className="Overview-VoteCount-Fish"><i className='fas fa-fish'></i></div>);
    } else {
      if(Math.random() < 0.5) {
        fishes.push(<div className="Overview-VoteCount-Fish"><i className='fas fa-fish'></i></div>);
      } else {
        fishes.pop(<div className="Overview-VoteCount-Fish"><i className='fas fa-fish'></i></div>);
      }
    }
    return fishes;
  }
  render() {
    let count = this.props.gnashes ? [] : this.getCount();
    return (
      <div className="Overview" key={this.props.candidate.id}>
        <Candidate candidate={this.props.candidate} key={this.props.candidate.id} />
        <div className="Overview-VoteCount">
          {this.props.gnashes ? this.state.fishes : count}
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { votes } = state.votes;
  const { candidates } = state.candidates;
  return {
    votes,
    candidates
  }
}
 
export default connect(mapStateToProps)(Overview)

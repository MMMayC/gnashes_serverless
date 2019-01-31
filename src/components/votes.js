import React, {Component} from "react";
import { connect } from "react-redux";
import update from 'immutability-helper';
import Vote from "./vote";
import Gnashes from "./gnashes";
import Overview from "./overview";

class Votes extends Component {
  constructor(props) {
    super(props);
    this.findCandidateByName = this.findCandidateByName.bind(this);
    this.getNextVote = this.getNextVote.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateOverview = this.updateOverview.bind(this);
    this.state = {
      currentVoteIndex: 0,
      revealGnashes: false,
      currentCandidates: [],
      currentVotes: []
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  findCandidateByName(candidateName) {
    const candidate = this.props.candidates.filter(candidate => candidate.name == candidateName);
    return candidate[0];
  }
  handleKeyDown(e) {
    switch (e.keyCode) {
      case 32:
        this.getNextVote();
        break;
      default:
        break;
    }
  }
  getNextVote() {
    if(this.state.currentVoteIndex < this.props.votes.length - 1) {
      this.setState({
        currentVoteIndex: ++ this.state.currentVoteIndex,
      });
    } else {
      this.setState({
        revealGnashes: true
      })
    }
    this.updateOverview(this.state.currentVoteIndex);

  }
  updateOverview(currentIndex) {
    let currentVote = this.props.votes && this.props.votes != [] ? this.props.votes[this.state.currentVoteIndex] : null;
    if(currentIndex == 1) {
      this.setState({
        currentCandidates: update(this.state.currentCandidates, {$push: [this.props.votes[0].candidate]}),
        currentVotes: update(this.state.currentVotes, {$push: [1]})
      })
    }

    let index = this.state.currentCandidates.indexOf(currentVote.candidate);

    if(index < 0) {
      this.setState({
        currentCandidates: update(this.state.currentCandidates, {$push: [currentVote.candidate]}),
        currentVotes: update(this.state.currentVotes, {$push: [1]})
      })
    } else {
      let count = this.state.currentVotes[index];
      this.setState({
        currentVotes: update(this.state.currentVotes,{[index]: {$set: ++count}})
      })
    }
  }

  render(){
   let currentVote = this.props.votes && this.props.votes != [] ? this.props.votes[this.state.currentVoteIndex] : null;
   let gnashesCandidates = [];
   if (this.props.gnashes && this.props.gnashes !=[]) {
    this.props.gnashes.map(each => {
      gnashesCandidates.push(this.findCandidateByName(each));
     });  
   }
    return (
      <div className="Votes">
        {
          this.state.revealGnashes == true ?
          <Gnashes candidates={gnashesCandidates} /> :
          <Vote vote={currentVote} candidate={this.findCandidateByName(currentVote.candidate)} />
        }
        <div className="Votes-Overview">
          {this.state.revealGnashes == true ?
          this.props.candidates.map((candidate, index) => {
            return(
              <Overview candidate={candidate} gnashes={true} key={index + 100} />
            );
        }) :
          this.state.currentCandidates != [] ?
            this.state.currentCandidates.map((candidate, index) => {
              return(
                <Overview candidate={this.findCandidateByName(candidate)} voteCount={this.state.currentVotes[index]} gnashes={false} key={index} />
              );
            }) :
            ""  
        }
        </div>
        {
          this.state.revealGnashes == true ?
          "" :
          <div className="Votes-Count">{this.state.currentVoteIndex + 1} / {this.props.votes && this.props.votes != [] ? this.props.votes.length : "" }</div>
        }
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
 
export default connect(mapStateToProps)(Votes)

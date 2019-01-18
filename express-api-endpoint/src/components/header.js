import React, {Component} from "react";

class Header extends Component {
    render(){
      return (
        <div className="Header">
            <div className="Header-Pacific">Pacific Magazines</div>
            <div className="Header-Grizzly">
                <img src="img/grizzly.png" />
            </div>
            <div className="Header-Gnashes">The Gnashes</div>
        </div>
      );
    }
}

export default Header;

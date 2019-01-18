import React, {Component} from "react";
import Nomination from "./components/nomination"
import { Switch, Route } from "react-router-dom"
import Result from "./components/result"

class Layout extends Component {
    render(){
      return (
        <Switch>
            <Route path="/" exact component={ Nomination } />
            <Route path="/result" exact component={ Result } />
        </Switch>
      );
    }
}

export default Layout;

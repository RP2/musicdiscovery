import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import home from "./home.js";
import addsong from "./addsong.js";
import pickgenre from "./pickgenre.js";

class Routes extends Component {
  render() {
    return (
        <div className="routes">
            <Switch>
            <Route path="/addsong" component={addsong} />
            <Route path="/pickgenre" component={pickgenre} />
            <Route exact path="/" component={home} />
            <Route exact path="/*" render={() => <div>Error 404</div>} />
            </Switch>
        </div>
    );
  }
}

export default Routes;
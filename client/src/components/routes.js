import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import home from "./home.js";
import addsong from "./addsong.js";
import pickgenre from "./pickgenre.js";
import login from "./user/login.js";
import signup from "./user/signup.js";
import profile from "./user/profile.js";

class Routes extends Component {
  render() {
    return (
        <div className="routes">
            <Switch>
            <Route path="/addsong" component={addsong} />
            <Route path="/pickgenre" component={pickgenre} />
            <Route path="/login" component={login} />
            <Route path="/signup" component={signup} />
            <Route path="/profile" component={profile} />
            <Route exact path="/" component={home} />
            <Route exact path="/*" render={() => <div><h1>Error 404, that page does not exist</h1></div>} />
            </Switch>
        </div>
    );
  }
}

export default Routes;
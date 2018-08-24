import React, { Component } from 'react';
import { Switch, Route, NavLink, withRouter } from "react-router-dom";
import Routes from "./components/routes.js";

class App extends Component {
  render() {
    return (
      <div className="routes">
        <Routes />
      </div>
    );
  }
}

export default App;

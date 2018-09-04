import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
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

export default withRouter(App);

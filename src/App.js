import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Snackbar from "@material-ui/core/Snackbar";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./routers";

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: "100%" }}>
        <Router>
          <Routers />
        </Router>
      </div>
    );
  }
}

export default App;

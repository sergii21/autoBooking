import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Booking from "./booking/containers/Booking";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/:service_slug?/:brand_slug?/:style_slug?">
            <Booking></Booking>
          </Route>
        </Switch>
      </Router>
    );
  } 
}

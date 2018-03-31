import React, { Component } from "react";
import { connect } from "react-redux";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";
import history from "./history";
import { Main, Input, Welcome } from './components';

class Routes extends Component {
  
  render() {
    return (
      <Router history={history}>
        <div>
          <Main />
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/input' component={Input} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes;
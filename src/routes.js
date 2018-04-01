import React, { Component } from "react";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";
import history from "./history";
import { Main, Input, Welcome, FurbabiesList } from './components';

class Routes extends Component {
  
  render() {
    return (
      <Router history={history}>
        <div>
          <Main />
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/input' component={Input} />
            <Route path='/furbabies' component={FurbabiesList} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes;
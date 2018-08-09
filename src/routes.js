import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Main, Input, Welcome, FurbabiesList, ParentsList, Furbaby, Parent } from './components';

class Routes extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/input' component={Input} />
            <Route path='/furbabies' component={FurbabiesList} />
            <Route path='/parents' component={ParentsList} />
            <Route path='/furbaby' component={Furbaby} />
            <Route path='/parent' component={Parent} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes;
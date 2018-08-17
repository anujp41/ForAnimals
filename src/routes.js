import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { Main, Input, Login, Welcome, FurbabiesList, ParentsList, Furbaby, Parent } from './components';
import history from './history';

class Routes extends Component {
  
  render() {
    return (
      <Router history={history}>
        <div>
          <Main />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/welcome' component={Welcome} />
            <Route path='/input' component={Input} />
            <Route path='/furbabies' component={FurbabiesList} />
            <Route path='/parents' component={ParentsList} />
            <Route path='/furbaby' component={Furbaby} />
            <Route path='/parent' component={Parent} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes;
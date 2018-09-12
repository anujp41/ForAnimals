import React, { Component } from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { Main, Input, Login, Welcome, FurbabiesList, ParentsList, Furbaby, Parent, ResetPW } from './components';
import { connect } from 'react-redux'
import history from './history';

const PrivateRoute = ({component: Component, path: Path, user: User}) => {
  const currUser = JSON.parse(localStorage.getItem('current-user'));
  return (
    <Route
      path={Path}
      render={() => 
        currUser && currUser.hasOwnProperty('id') ? (
        <Component/>
      ) : (
        <Redirect to ={{pathname: '/'}} />
      )}
    />
  )
}

class Routes extends Component {
  render() {
    const {user} = this.props;
    return (
      <Router history={history}>
        <div>
          <Main />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/resetpassword' component={ResetPW} />
            <PrivateRoute path='/welcome' component={Welcome} user={user}/>
            <PrivateRoute path='/input' component={Input} user={user}/>
            <PrivateRoute path='/furbabies' component={FurbabiesList} user={user}/>
            <PrivateRoute path='/parents' component={ParentsList} user={user}/>
            <PrivateRoute path='/furbaby' component={Furbaby} user={user}/>
            <PrivateRoute path='/parent' component={Parent} user={user}/>
            <Route component={Login} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapState = state => ({ user: state.user });

export default connect(mapState, null)(Routes);
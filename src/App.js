//Core imports
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

//Main navigation releated imports
import MainNav from './components/common/MainNav';
import { MainNavConfig } from './config/navConfig';

//Layout imports
import Dashboard from './components/layouts/dashboard';
import Section from './components/layouts/section'
import Settings from './components/layouts/settings';

class App extends Component {

  render() {

    //Protectig the component to prevent access without login
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <Container>
        <MainNav MainNavConfig={MainNavConfig} />
        {/* Define all main app components here */}
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/section' component={Section} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('Global state logged from App componenet', state);
  return {
    auth: state.firebase.auth,
    role: state.firebase.profile.role
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    //Loading user role to manage access. 
    //This will be stored in global state as firestore.data.accessRole
    //Any component can get the access rules by mapping state to props from above location
    { collection: 'roles', doc: props.role, storeAs: 'accessRole' }
  ])
)(App);

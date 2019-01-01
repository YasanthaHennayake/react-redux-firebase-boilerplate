//Core imports
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

//Main navigation releated imports
import MainNav from './components/common/MainNav';
import { MainNavConfig } from './config/navConfig';

//Layout imports
import Dashboard from './components/layout/dashboard/Dashboard';
import Section from './components/layout/section/Section'

class App extends Component {
  render() {
    return (
      <Container>
        <MainNav MainNavConfig={MainNavConfig} />
        {/* Define all main app components here */}
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/section' component={Section} />
        </Switch>
      </Container>
    );
  }
}

export default App;

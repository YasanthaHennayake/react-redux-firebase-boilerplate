import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import SideNav from '../../common/SideNav';
import { settingsNavConfig } from '../../../config/navConfig';

import Roles from './roles';
import Invites from './invites';
import Users from './users';


export class Settings extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={3}>
          <SideNav sideNavConfig={settingsNavConfig} />
        </Grid.Column>

        <Grid.Column stretched width={13}>
          <Switch>
            <Route path='/settings/roles' component={Roles} />
            <Route path='/settings/invitations' component={Invites} />
            <Route path='/settings/users' component={Users} />
          </Switch>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Settings

import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import SideNav from '../../common/SideNav';
import { sectionNavConfig } from '../../../config/navConfig';

import SectionContent from './SectionContent';


export class Section extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={3}>
          <SideNav sideNavConfig={sectionNavConfig} />
        </Grid.Column>

        <Grid.Column stretched width={13}>
          <Switch>
            <Route path='/section/content' component={SectionContent} />
          </Switch>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Section

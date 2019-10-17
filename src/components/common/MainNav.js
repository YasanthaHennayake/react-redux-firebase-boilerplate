import React, { Component } from 'react';
import { Input, Menu, Image, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

import Brand from '../../resources/logo.png';

class MainNav extends Component {
  state = {
    activeItem: 'home',
    updatedMainNavConfig: undefined
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  handleSignOut = () => {
    this.props.signOut();
  }

  //Checking main nav items as per the role
  //If there is a property named {nav: true} under the nav section name (MainNavConfig[x].name) in the accessRole it will add the nav item to the updatedMainNavConfig array
  getUpdatedMainNavConfig = (MainNavConfig) => {
    const { accessRole } = this.props;
    var updatedMainNavConfig = [];
    if (accessRole) {
      MainNavConfig.map(navItem => {
        if (accessRole[navItem.name].nav) {
          updatedMainNavConfig.push(navItem);
        }
        return null;
      });
    }
    return updatedMainNavConfig;
  }

  render() {

    const { MainNavConfig } = this.props;
    const updatedMainNavConfig = this.getUpdatedMainNavConfig(MainNavConfig);
    const { activeItem } = this.state;

    return (
      <div>
        <Menu secondary>
          <Menu.Item header>
            <Image src={Brand ? Brand : 'Brand'} size='tiny' />
          </Menu.Item>

          {
            // Takes in main navigation configuration passed as a property and generate menu items
            updatedMainNavConfig ?
              updatedMainNavConfig.map((navItem) => {
                return (
                  <Menu.Item
                    onClick={this.handleItemClick}
                    name={navItem.name}
                    key={navItem.link}
                    active={activeItem === navItem.name}
                    as={Link}
                    to={navItem.link}
                  />
                )
              })
              :
              null
          }


          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleSignOut}
            />
          </Menu.Menu>
        </Menu>

        <Divider />
      </div>
    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

const mapStateToProps = (state) => {
  return {
    accessRole: state.firestore.data.accessRole
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
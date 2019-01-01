import React, { Component } from 'react';
import { Input, Menu, Image, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Brand from '../../resources/logo.png';

class MainNav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  render() {

    const { MainNavConfig } = this.props;
    const { activeItem } = this.state;

    return (
      <div>
        <Menu secondary>
          <Menu.Item header>
            <Image src={Brand ? Brand : 'Brand'} size='tiny' />
          </Menu.Item>

          {
            // Takes in main navigation configuration passed as a property and generate menu items
            MainNavConfig ?
              MainNavConfig.map((navItem) => {
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
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>

        <Divider />
      </div>
    )
  }
}

export default MainNav;
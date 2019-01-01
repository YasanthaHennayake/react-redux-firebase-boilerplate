import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SideNav extends Component {
  state = { activeItem: 'bio' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { sideNavConfig } = this.props;
    const { activeItem } = this.state;
    return (
      <Menu vertical>
        {
          sideNavConfig.map(({ menuHeader, menuItems }) => {
            return (
              <Menu.Item key={menuHeader}>
                <Menu.Header>{menuHeader}</Menu.Header>
                <Menu.Menu>
                {
                  menuItems.map((menuItem) => {
                    return (
                      <Menu.Item
                        onClick={this.handleItemClick}
                        name={menuItem.name}
                        key={menuItem.link}
                        active={activeItem === menuItem.name}
                        as={Link}
                        to={menuItem.link}
                      />
                    )
                  })
                }
                </Menu.Menu>
              </Menu.Item>
            )
          })
        }
      </Menu>
    )
  }
}

export default SideNav;
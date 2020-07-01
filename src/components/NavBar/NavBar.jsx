import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { ALL_SECTIONS } from '../../constants/section';
import style from './NavBar.module.scss';

const useLocationToFindIndex = () => {
  const location = useLocation();
  return ALL_SECTIONS.findIndex(({ path }) => location.pathname === path);
};

const NavBar = ({ toggleNav, navBarState }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(useLocationToFindIndex());

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const toggleDrawer = (state) => () => {
    toggleNav(state);
  };

  const list = () => (
    <div
      className={style['NavBar__link-container']}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {ALL_SECTIONS.map(({ path, name }, index) => (
          <NavLink className={style.NavBar__link} key={name} to={path}>
            <ListItem
              button
              key={name}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
            >
              <ListItemText primary={name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Drawer anchor="left" open={navBarState} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
};

NavBar.defaultProps = {
  navBarState: false,
};

NavBar.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  navBarState: PropTypes.bool,
};

export default NavBar;

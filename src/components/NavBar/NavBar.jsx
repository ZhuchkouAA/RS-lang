import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { ALL_SECTIONS, GAMES, MAIN, OTHER } from '../../constants/section';
import style from './NavBar.module.scss';

const useStyles = makeStyles({
  listItem: {
    fontWeight: 100,
    fontSize: '18px',
  },
  divider: {
    margin: '0 15px',
  },
});

const useLocationToFindIndex = () => {
  const location = useLocation();
  return ALL_SECTIONS.findIndex(({ path }) => location.pathname === path);
};

const NavBar = ({ toggleNav, navBarState }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(useLocationToFindIndex());

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const toggleDrawer = (state) => () => {
    toggleNav(state);
  };

  const createList = (() => {
    let index = 0;

    return (list) =>
      list.map(({ path, name }) => {
        const indexCurrent = index;
        index += 1;

        return (
          <NavLink className={style.NavBar__link} key={name} to={path}>
            <ListItem
              button
              className={style.NavBar__link}
              key={indexCurrent}
              selected={selectedIndex === indexCurrent}
              onClick={() => handleListItemClick(indexCurrent)}
            >
              <ListItemText primary={name} classes={{ primary: classes.listItem }} />
            </ListItem>
          </NavLink>
        );
      });
  })();

  return (
    <Drawer anchor="left" open={navBarState} onClose={toggleDrawer(false)}>
      <div
        className={style['NavBar__link-container']}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          {createList(MAIN)}
          <div className={style.title}>Игры</div>
          <Divider classes={{ root: classes.divider }} />
          {createList(GAMES)}
          <div className={style.title}>Разное</div>
          <Divider classes={{ root: classes.divider }} />
          {createList(OTHER)}
        </List>
      </div>
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

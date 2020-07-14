import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';

import { ListItem, ListItemText, Divider, List, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ALL_SECTIONS, GAMES, MAIN, OTHER } from '../../constants/section';
import style from './NavBar.module.scss';

const useStyles = makeStyles({
  listItem: {
    fontSize: '18px',
    fontWeight: 100,
  },

  divider: {
    margin: '0 15px',
  },

  root: {
    flex: '0 1 auto',
  },

  root2: {
    justifyContent: 'center',
  },
});

const useLocationToFindIndex = () => {
  const location = useLocation();
  return ALL_SECTIONS.findIndex(({ path }) => location.pathname === path);
};

const NavBar = ({ toggleNav, navBarState, setGameName }) => {
  const classes = useStyles();

  const locationIndex = useLocationToFindIndex();
  const [selectedIndex, setSelectedIndex] = React.useState(locationIndex);

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
          <NavLink
            onClick={() => setGameName(name)}
            className={style.NavBar__link}
            key={name}
            to={path}
          >
            <ListItem
              alignItems="center"
              classes={{ root: classes.root2 }}
              button
              className={style.NavBar__link}
              key={indexCurrent}
              selected={selectedIndex === indexCurrent}
              onClick={() => handleListItemClick(indexCurrent)}
            >
              <ListItemText
                primary={name}
                classes={{ primary: classes.listItem, root: classes.root }}
              />
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
  setGameName: PropTypes.func.isRequired,
};

export default NavBar;

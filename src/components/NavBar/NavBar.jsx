import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import store from '../../redux/redux-store';

import { ALL_SECTIONS } from '../../constants/section';
import style from './NavBar.module.scss';

const NavBar = ({ setNavBarState }) => {
  const [count, setCount] = useState(0);
  store.subscribe(() => {
    setCount(count + 1);
  });

  const { navBar } = store.getState();
  const activeClass = `NavBar-${navBar.state}`;

  const handlerOnClick = () => {
    store.dispatch(setNavBarState('disable'));
  };

  return (
    <nav className={`${style.NavBar} ${style[activeClass]}`}>
      <div className={style.NavBar__linkContainer}>
        {ALL_SECTIONS.map(({ path, name }) => (
          <NavLink
            onClick={handlerOnClick}
            className={style['NavBar__linkContainer-link']}
            key={name}
            to={path}
          >
            {name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  setNavBarState: PropTypes.func.isRequired,
};

export default NavBar;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../redux/redux-store';

import path from '../../constants/path';
import style from './NavBar.module.scss';

const NavBar = () => {
  const [count, setCount] = useState(0);
  store.subscribe(() => {
    setCount(count + 1);
  });

  const linksKeys = Object.keys(path);
  const necessaryKeys = linksKeys.filter((key) => key !== 'SIGN_IN' && key !== 'SIGN_UP');

  const { navBar } = store.getState();

  const activeClass = `NavBar-${navBar.state}`;

  return (
    <nav className={`${style.NavBar} ${style[activeClass]}`}>
      <div className={style.NavBar__linkContainer}>
        {necessaryKeys.map((key) => (
          <NavLink className={style['NavBar__linkContainer-link']} key={key} to={path[key]}>
            {key}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;

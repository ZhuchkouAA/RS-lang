import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../redux/redux-store';

import { ALL_SECTIONS } from '../../constants/section';
import style from './NavBar.module.scss';

const NavBar = () => {
  const [count, setCount] = useState(0);
  store.subscribe(() => {
    setCount(count + 1);
  });

  const links = ALL_SECTIONS.map((info) => {
    const { path, name } = info;

    return (
      <NavLink className={style['NavBar__linkContainer-link']} key={name} to={path}>
        {name}
      </NavLink>
    );
  });

  const { navBar } = store.getState();
  const activeClass = `NavBar-${navBar.state}`;

  return (
    <nav className={`${style.NavBar} ${style[activeClass]}`}>
      <div className={style.NavBar__linkContainer}>{links}</div>
    </nav>
  );
};

export default NavBar;

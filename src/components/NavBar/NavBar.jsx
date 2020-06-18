import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './NavBar.module.scss';
import path from '../../constants/path';

const linksKeys = Object.keys(path);
const necessaryKeys = linksKeys.filter((key) => key !== 'SIGN_IN' && key !== 'SIGN_UP');

const NavBar = () => (
  <nav className={style.NavBar}>
    <div className={style.NavBar__LinkContainer}>
      {necessaryKeys.map((key) => (
        <NavLink className={style.NavBar__LinkContainer__Link} key={key} to={path[key]}>
          {key}
        </NavLink>
      ))}
    </div>
  </nav>
);

export default NavBar;

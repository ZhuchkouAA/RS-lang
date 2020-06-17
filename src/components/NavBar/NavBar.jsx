import React from 'react';
import { NavLink } from 'react-router-dom';

import Style from './NavBar.module.scss';
import path from '../../constants/path';

const linksKeys = Object.keys(path);
const navBarLinks = linksKeys.map((key) =>
  key !== 'SIGN_IN' && key !== 'SIGN_UP' ? (
    <NavLink key={key} className={Style.el} to={path[key]}>
      {key}
    </NavLink>
  ) : (
    false
  )
);

const NavBar = () => (
  <nav className={Style['menu-box']}>
    <div className={Style.items}>{navBarLinks}</div>
  </nav>
);

export default NavBar;

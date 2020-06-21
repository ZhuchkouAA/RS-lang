import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { ALL_SECTIONS } from '../../constants/section';
import style from './NavBar.module.scss';

const NavBar = ({ toggleNav, navBarState }) => {
  const NavBarActiveClass = `NavBar-${navBarState}`;
  const ListActiveClass = 'NavBar__linkContainer-link-active';

  const handlerOnClick = (event) => {
    const { target } = event;

    if (!target.classList.contains(style[ListActiveClass])) {
      toggleNav('disable');
    }
  };

  return (
    <nav className={`${style.NavBar} ${style[NavBarActiveClass]}`}>
      <div className={style.NavBar__linkContainer}>
        {ALL_SECTIONS.map(({ path, name }) => (
          <NavLink
            onClick={handlerOnClick}
            className={style['NavBar__linkContainer-link']}
            key={name}
            to={path}
            activeClassName={style[ListActiveClass]}
          >
            {name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

NavBar.defaultProps = {
  navBarState: 'disable',
};

NavBar.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  navBarState: PropTypes.string,
};

export default NavBar;

import React from 'react';
import { NavLink } from 'react-router-dom';

import PATH from '../../constants/path';

const PromoPage = () => (
  <>
    <p>PromoPage</p>
    <NavLink to={PATH.SIGN_IN}>SignInPage</NavLink>
  </>
);

export default PromoPage;

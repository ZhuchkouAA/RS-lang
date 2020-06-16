import React from 'react';
import { NavLink } from 'react-router-dom';

import PATH from '../../constants/path';

const AboutUsPage = () => (
  <>
    <p>AboutUsPage</p>
    <NavLink to={PATH.SIGN_UP}>SignInPage</NavLink>
  </>
);

export default AboutUsPage;

import React from 'react';
import { Link } from 'react-router-dom';

import PATH from '../../constants/path';

const AboutUsPage = () => (
  <>
    <p>AboutUsPage</p>
    <Link to={PATH.SIGN_UP}>SignInPage</Link>
  </>
);

export default AboutUsPage;

import React from 'react';
import { Link } from 'react-router-dom';

import PATH from '../../constants/path';

const SettingsPage = () => (
  <>
    <p>SettingsPage</p>
    <Link to={PATH.SIGN_IN}>SignInPage</Link>
  </>
);

export default SettingsPage;

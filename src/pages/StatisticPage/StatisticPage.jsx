import React from 'react';
import { Link } from 'react-router-dom';

import PATH from '../../constants/path';

const StatisticPage = () => (
  <>
    <p>StatisticPage</p>
    <Link to={PATH.SIGN_IN}>SignInPage</Link>
  </>
);

export default StatisticPage;

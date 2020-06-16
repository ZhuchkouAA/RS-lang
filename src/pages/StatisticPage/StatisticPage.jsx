import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const StatisticPage = () => (
  <>
    <p>StatisticPage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default StatisticPage;

import React from 'react';
import { Link } from 'react-router-dom';

import { signInPath } from '../pages-path';

const PromoPage = () => (
  <>
    <p>PromoPage</p>
    <Link to={signInPath}>SignInPage</Link>
  </>
);

export default PromoPage;

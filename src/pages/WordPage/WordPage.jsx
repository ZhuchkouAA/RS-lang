import React from 'react';
import { NavLink } from 'react-router-dom';

import PATH from '../../constants/path';
import WordCard from '../../components/WordCard/WordCard';

const WordPage = () => (
  <>
    <p>WordPage</p>
    <NavLink to={PATH.SIGN_IN}>SignInPage</NavLink>
    <WordCard />
  </>
);

export default WordPage;

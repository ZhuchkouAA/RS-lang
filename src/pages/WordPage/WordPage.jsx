import React from 'react';
<<<<<<< HEAD

import WordCard from '../../components/WordCard';

const WordPage = () => <WordCard />;
=======
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
>>>>>>> RSL-10: add wordpage in app structure

export default WordPage;

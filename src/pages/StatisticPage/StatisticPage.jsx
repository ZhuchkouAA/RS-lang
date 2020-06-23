import React from 'react';
import { NavLink } from 'react-router-dom';

import PATH from '../../constants/path';

import CustomizedDialogs from '../../components/ModalWindow/index';

const StatisticPage = () => (
  <>
    <CustomizedDialogs isOpen message="Araik!" type="ino" />
    <NavLink to={PATH.SIGN_IN}>SignInPage</NavLink>
  </>
);

export default StatisticPage;

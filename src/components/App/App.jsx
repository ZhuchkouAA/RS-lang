import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import AppWithRoutes from './AppWithRouter';
import Authorization from './Authorization';
import Header from '../Header';
import { token } from '../../constants/cookiesNames';

const App = ({ getUserData }) => {
  const PageRoutes = getUserData(token) ? <AppWithRoutes /> : <Authorization />;
  return (
    <>
      <Header />
      <NavBar />
      <BrowserRouter>{PageRoutes}</BrowserRouter>
      <Footer />
    </>
  );
};

App.defaultProps = {
  getUserData: () => null,
};

App.propTypes = {
  getUserData: PropTypes.func,
};

export default App;

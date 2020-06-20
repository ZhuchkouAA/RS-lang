import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../Header';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import AppWithRoutes from './AppWithRouter';
import Authorization from './Authorization';

const App = ({ token }) => {
  const PageRoutes = token ? <AppWithRoutes /> : <Authorization />;
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
  token: null,
};

App.propTypes = {
  token: PropTypes.string,
};

export default App;

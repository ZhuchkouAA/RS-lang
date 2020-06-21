import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import AppWithRoutes from './AppWithRouter';
import Authorization from './Authorization';
import Header from '../Header';

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

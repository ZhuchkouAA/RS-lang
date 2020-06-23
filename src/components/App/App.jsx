import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer/Footer';
import ProgressBar from '../ProgressBar';
import AppWithRoutes from './AppWithRouter';
import Authorization from './Authorization';
import CustomizedDialogs from '../ModalWindow/index';

const App = ({ token }) => {
  const PageRoutes = token ? <AppWithRoutes /> : <Authorization />;

  return (
    <>
      <BrowserRouter>
        <Header />
        <ProgressBar />
        {PageRoutes}
      </BrowserRouter>
      <CustomizedDialogs />
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

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
<<<<<<< HEAD
import AppWithRoutes from './AppWithRouter';
import Authorization from './Authorization';
import Header from '../Header';

const App = ({ token }) => {
  const PageRoutes = token ? <AppWithRoutes /> : <Authorization />;

  return (
    <>
=======
import ProgressBar from '../ProgressBar/ProgressBar';
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import MainPage from '../../pages/MainPage';
import WordPage from '../../pages/WordPage';
import DictionaryPage from '../../pages/DictionaryPage';
import SpeakItPage from '../../pages/SpeakItPage';
import EnglishPuzzlePage from '../../pages/EnglishPuzzlePage';
import SavannaPage from '../../pages/SavannaPage';
import AudioCallPage from '../../pages/AudioCallPage';
import SprintPage from '../../pages/SprintPage';
import OnwGamePage from '../../pages/OnwGamePage';
import StatisticPage from '../../pages/StatisticPage';
import SettingsPage from '../../pages/SettingsPage';
import PromoPage from '../../pages/PromoPage';
import AboutUsPage from '../../pages/AboutUsPage';
import ErrorPage from '../../pages/ErrorPage';

const App = () => (
  <>
    <Provider store={store}>
      <ProgressBar max={1000} now={100} />
>>>>>>> feat: add progress bar
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

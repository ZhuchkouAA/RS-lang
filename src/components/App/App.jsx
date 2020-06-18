import React from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../redux/redux-store';

import PATH from '../../constants/path';

import Header from '../Header';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import MainPage from '../../pages/MainPage';
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
      <BrowserRouter>
        <Header />
        <NavBar />
        <Switch>
          <Route exact path="/" component={() => <Redirect to={PATH.SIGN_IN} />} />
          <Route exact path={PATH.SIGN_IN} component={SignInPage} />
          <Route exact path={PATH.SIGN_UP} component={SignUpPage} />
          <Route exact path={PATH.MAIN} component={MainPage} />
          <Route exact path={PATH.DICTIONARY} component={DictionaryPage} />
          <Route exact path={PATH.SPEAK_IT} component={SpeakItPage} />
          <Route exact path={PATH.ENGLISH_PUZZLE} component={EnglishPuzzlePage} />
          <Route exact path={PATH.SAVANNA} component={SavannaPage} />
          <Route exact path={PATH.AUDIO_CALL} component={AudioCallPage} />
          <Route exact path={PATH.SPRINT} component={SprintPage} />
          <Route exact path={PATH.OWN_GAME} component={OnwGamePage} />
          <Route exact path={PATH.STATISTIC} component={StatisticPage} />
          <Route exact path={PATH.SETTINGS} component={SettingsPage} />
          <Route exact path={PATH.PROPMO} component={PromoPage} />
          <Route exact path={PATH.ABOUT_US} component={AboutUsPage} />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </Provider>
  </>
);

export default App;

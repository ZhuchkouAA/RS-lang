import React from 'react';
import { Route, HashRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/redux-store';

import {
  signInPath,
  signUpPath,
  mainPath,
  dictionaryPath,
  speakItPath,
  englishPuzzlePath,
  savannaPath,
  audioCallPath,
  sprintPath,
  onwGamePath,
  statisticPath,
  settingsPath,
  promoPath,
  aboutUsPath,
} from '../../pages/pages-path';

import Header from '../Header/Header';
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

const App = () => (
  <>
    <Header />
    <NavBar />
    <Footer />
    <Provider store={store}>
      <HashRouter>
        <Route exact path="/" component={() => <Redirect to={signInPath} />} />
        <Route path={signInPath} component={() => <SignInPage />} />
        <Route path={signUpPath} component={() => <SignUpPage />} />
        <Route path={mainPath} component={() => <MainPage />} />
        <Route path={dictionaryPath} component={() => <DictionaryPage />} />
        <Route path={speakItPath} component={() => <SpeakItPage />} />
        <Route path={englishPuzzlePath} component={() => <EnglishPuzzlePage />} />
        <Route path={savannaPath} component={() => <SavannaPage />} />
        <Route path={audioCallPath} component={() => <AudioCallPage />} />
        <Route path={sprintPath} component={() => <SprintPage />} />
        <Route path={onwGamePath} component={() => <OnwGamePage />} />
        <Route path={statisticPath} component={() => <StatisticPage />} />
        <Route path={settingsPath} component={() => <SettingsPage />} />
        <Route path={promoPath} component={() => <PromoPage />} />
        <Route path={aboutUsPath} component={() => <AboutUsPage />} />
      </HashRouter>
    </Provider>
  </>
);

export default App;

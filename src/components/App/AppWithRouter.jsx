import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

import PATH from '../../constants/path';
import gamesDescriptionObj from '../../constants/gamesDescription';
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
import NavBar from '../NavBar';
import GameStartScreen from '../GameStartScreen';

const AppWithRoutes = ({ gameName, words }) => {
  const gameStartScreenComponent = gamesDescriptionObj[gameName] ? GameStartScreen : MainPage;
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={() => <Redirect to={PATH.MAIN} />} />
        <Route exact path={PATH.MAIN} component={MainPage} />
        <Route exact path={PATH.WORD_CARD} component={WordPage} />
        <Route exact path={PATH.DICTIONARY} component={DictionaryPage} />
        <Route exact path={PATH.SPEAK_IT} component={SpeakItPage} />
        <Route exact path={PATH.ENGLISH_PUZZLE} component={EnglishPuzzlePage} />
        <Route exact path={PATH.SAVANNA} component={SavannaPage} />
        <Route exact path={PATH.AUDIO_CALL} component={AudioCallPage} />
        <Route exact path={PATH.STATISTIC} component={StatisticPage} />
        <Route exact path={PATH.SETTINGS} component={SettingsPage} />
        <Route exact path={PATH.PROMO} component={PromoPage} />
        <Route exact path={PATH.ABOUT_US} component={AboutUsPage} />
        <Route exact path={PATH.GAME_START_SCREEN} component={gameStartScreenComponent} />
        {words.length !== 0 && <Route exact path={PATH.SPRINT} component={SprintPage} />}
        {words.length !== 0 && <Route exact path={PATH.OWN_GAME} component={OnwGamePage} />}
        <Redirect to={{ pathname: PATH.MAIN }} />
      </Switch>
    </>
  );
};

AppWithRoutes.propTypes = {
  gameName: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AppWithRoutes;

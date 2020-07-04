import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userDataReducer from './sign-in.reducer';
import settingsReducer from './settings.reducer';
import modalWindowReducer from './modalWindow.reducer';
import progressReducer from './progress.reducer';
import navBarReducer from './navBar.reducer';
import loaderReducer from './loader.reducer';
import gameModeReducer from './gameMode.reducer';

const reducers = combineReducers({
  routing: routerReducer,
  navBar: navBarReducer,
  userData: userDataReducer,
  settings: settingsReducer,
  modelWindow: modalWindowReducer,
  progress: progressReducer,
  loader: loaderReducer,
  gameModeData: gameModeReducer,
});

export default reducers;

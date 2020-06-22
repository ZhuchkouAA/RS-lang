import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userDataReducer from './sign-in.reducer';
import settingsReducer from './settings.reducer';
import modalWindowReducer from './modalWindow.reducer';
import progressReducer from './progress.reducer';

const reducers = combineReducers({
  routing: routerReducer,
  userData: userDataReducer,
  settings: settingsReducer,
  modelWindow: modalWindowReducer,
  progress: progressReducer,
});

export default reducers;

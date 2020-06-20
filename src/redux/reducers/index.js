import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userDataReducer from './sign-in.reducer';
import settingsReducer from './settings.reducer';

const reducers = combineReducers({
  routing: routerReducer,
  userData: userDataReducer,
  settings: settingsReducer,
});

export default reducers;

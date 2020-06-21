import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userDataReducer from './sign-in.reducer';
import settingsReducer from './settings.reducer';
import navBarReducer from './navBar.reducer';

const reducers = combineReducers({
  routing: routerReducer,
  navBar: navBarReducer,
  userData: userDataReducer,
  settings: settingsReducer,
});

export default reducers;

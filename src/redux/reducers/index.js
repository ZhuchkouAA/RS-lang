import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userDataReducer from './sign-in.reducer';
import navBarReducer from './navBar.reducer';

const reducers = combineReducers({
  routing: routerReducer,
  navBar: navBarReducer,
  userData: userDataReducer,
});

export default reducers;

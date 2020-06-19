import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userDataReducer from './sign-in.reducer';

const reducers = combineReducers({
  routing: routerReducer,
  userData: userDataReducer,
});

export default reducers;

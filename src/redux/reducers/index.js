import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import testReducer from './test-reducer';

const reducers = combineReducers({
  routing: routerReducer,
  testData: testReducer,
});

export default reducers;

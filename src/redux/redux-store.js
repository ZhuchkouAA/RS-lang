import { combineReducers, createStore } from 'redux';
import testReducer from './reducers/test-reducer';

const reducers = combineReducers({
  testData: testReducer
});

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

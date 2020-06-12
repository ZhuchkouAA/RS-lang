import { combineReducers, createStore } from 'redux';
import testReducer from './reducers/test-reducer';

const reducers = combineReducers({
  testData: testReducer,
});

const store = createStore(reducers);

export default store;

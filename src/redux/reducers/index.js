import { combineReducers } from 'redux'
import testReducer from './test-reducer'

const reducers = combineReducers({
  testData: testReducer,
})

export default reducers

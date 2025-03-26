import { combineReducers } from 'redux';
import writingReducer from './writingReducer';

const writingRootReducer = combineReducers({
  writing: writingReducer
});

export default writingRootReducer; 
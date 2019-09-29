import { combineReducers } from 'redux';

import flyoutReducer from './Flyout/reducer';

const appReducer = combineReducers({
  flyoutReducer,
});

export default appReducer;

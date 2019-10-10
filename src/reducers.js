import { combineReducers } from 'redux';

import analysisReducer from './Analysis/reducer';
import flyoutReducer from './Flyout/reducer';
import tokenlistReducer from './Analysis/TokenList/reducer';

const appReducer = combineReducers({
  analysisReducer,
  flyoutReducer,
  tokenlistReducer,
});

export default appReducer;

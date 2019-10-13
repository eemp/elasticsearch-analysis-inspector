import { combineReducers } from 'redux';

import analysisReducer from './Analysis/reducer';
import flyoutReducer from './Flyout/reducer';
import sampletextReducer from './SampleText/reducer';
import tokenlistReducer from './Analysis/TokenList/reducer';

const appReducer = combineReducers({
  analysisReducer,
  flyoutReducer,
  sampletextReducer,
  tokenlistReducer,
});

export default appReducer;

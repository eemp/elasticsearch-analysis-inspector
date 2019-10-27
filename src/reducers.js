import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import analysisReducer from './Analysis/reducer';
import flyoutReducer from './Flyout/reducer';
import sampletextReducer from './SampleText/reducer';
import tokenlistReducer from './Analysis/TokenList/reducer';

const appReducer = combineReducers({
  analysisReducer,
  form: formReducer,
  flyoutReducer,
  sampletextReducer,
  tokenlistReducer,
});

export default appReducer;

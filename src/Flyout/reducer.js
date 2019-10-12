import _ from 'lodash';

import {
  CLOSE_FLYOUT,
  OPEN_FLYOUT,
} from './actions';

const initialState = {
  content: null,
  open: false,
};

export default function FlyoutReducer(state = initialState, action) {
  switch(action.type) {
    case CLOSE_FLYOUT:
      return updateState({
        content: null,
        open: false,
      });
    case OPEN_FLYOUT:
      return updateState({
        content: action.payload,
        open: true,
      });
    default:
      return state;
  }

  function updateState(stateUpdate) {
    return _.assign({}, state, stateUpdate);
  }
}

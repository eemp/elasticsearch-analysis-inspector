import _ from 'lodash';

import {
  CLOSE_FLYOUT,
  OPEN_FLYOUT,
} from './actions';

const initialState = {
  content: null,
  open: false,
  title: null,
};

export default function FlyoutReducer(state = initialState, action) {
  switch(action.type) {
    case CLOSE_FLYOUT:
      return updateState({
        content: null,
        open: false,
        title: null,
      });
    case OPEN_FLYOUT:
      return updateState({
        content: action.payload.content,
        open: true,
        title: action.payload.title,
      });
    default:
      return state;
  }

  function updateState(stateUpdate) {
    return _.assign({}, state, stateUpdate);
  }
}

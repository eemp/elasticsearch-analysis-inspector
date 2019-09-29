import _ from 'lodash';

import {
  CLOSE_FLYOUT,
  HIDE_LOADING,
  OPEN_FLYOUT,
  SET_CONTENT,
  SHOW_LOADING
} from './actions';

const initialState = {
  content: null,
  loading: false,
  open: false,
};

export default function FlyoutReducer(state = initialState, action) {
  switch(action.type) {
    case CLOSE_FLYOUT:
      return updateState({
        content: null,
        loading: false,
        open: false,
      });
    case HIDE_LOADING:
      return updateState({ loading: false });
    case OPEN_FLYOUT:
      return updateState({ open: true });
    case SET_CONTENT:
      return updateState({ content: action.payload });
    case SHOW_LOADING:
      return updateState({ loading: true });
    default:
      return state;
  }

  function updateState(stateUpdate) {
    return _.assign({}, state, stateUpdate);
  }
}

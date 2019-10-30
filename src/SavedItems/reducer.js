import _ from 'lodash';

import {
  ADD_SAVEDITEM,
  REMOVE_SAVEDITEM,
} from './actions';

const initialState = {};

export default function SavedItemsReducer(state = initialState, action) {
  const { name, location } = (action.payload || {});
  switch(action.type) {
    case ADD_SAVEDITEM:
      return updateState({
        [name]: location,
      });
    case REMOVE_SAVEDITEM:
      return _.omit(state, [ name ]);
    default:
      return state;
  }

  function updateState(stateUpdate) {
    return _.assign({}, state, stateUpdate);
  }
}

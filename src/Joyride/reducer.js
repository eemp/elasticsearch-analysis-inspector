import _ from 'lodash';

import {
  STOP_JOYRIDE,
  RUN_JOYRIDE,
} from './actions';

const initialState = {
  inProgress: false,
};

export default function FlyoutReducer(state = initialState, action) {
  switch(action.type) {
    case STOP_JOYRIDE:
      return updateState({
        inProgress: false,
      });
    case RUN_JOYRIDE:
      return updateState({
        inProgress: true,
      });
    default:
      return state;
  }

  function updateState(stateUpdate) {
    return _.assign({}, state, stateUpdate);
  }
}


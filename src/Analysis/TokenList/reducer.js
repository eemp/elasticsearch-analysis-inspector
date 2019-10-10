import {
  SELECT_TOKENS,
  UNSELECT_TOKENS,
} from './actions';

const initialState = null;

export default function TokenListReducer(state = initialState, action) {
  switch(action.type) {
    case SELECT_TOKENS:
      return action.payload;
    case UNSELECT_TOKENS:
      return null;
    default:
      return state;
  }
}

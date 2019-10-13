import { sampleText as initialState } from '../sample-data';

import {
  UPDATE_SAMPLETEXT,
} from './actions';

export default function FlyoutReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_SAMPLETEXT:
      return action.payload;
    default:
      return state;
  }
}

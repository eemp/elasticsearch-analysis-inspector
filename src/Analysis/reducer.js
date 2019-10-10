import _ from 'lodash';
import uuid from 'uuid/v4';

import {
  ADD_ANALYSIS,
  REMOVE_ANALYSIS,
  UPDATE_ANALYSIS,
} from './actions';

import { analyses } from '../sample-data';

const initialState = analyses;

export default function AnalysisReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ANALYSIS:
      const newAnalysis = _.assign({ key: uuid() }, action.payload);
      return _.concat(newAnalysis, state);
    case REMOVE_ANALYSIS:
      return _.filter(state, analysis => analysis.key !== action.payload);
    case UPDATE_ANALYSIS:
      return _.map(state, analysis => {
        return action.payload.key === analysis.key
          ? action.payload
          : analysis
        ;
      });
    default:
      return state;
  }
}

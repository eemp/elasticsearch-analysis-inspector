import _ from 'lodash';
import { openFlyout } from '../Flyout/actions';

export const ADD_ANALYSIS = 'analysis/add';
export const REMOVE_ANALYSIS = 'analysis/remove';
export const UPDATE_ANALYSIS = 'analysis/update';

const DEFAULT_NEW_ANALYSIS = {
  name: 'Standard Analyzer',
  definition: {
    analyzer: 'standard',
  },
};

export function addAnalysis() {
  return (dispatch, getState) => {
    const { analysisReducer: analyses } = getState();
    const baseAnalysis = _.first(analyses, 0) || DEFAULT_NEW_ANALYSIS;
    const newAnalysis = _.assign({}, _.omit(baseAnalysis, ['key']), {
      mode: 'edit',
    });
    return dispatch(action(ADD_ANALYSIS, newAnalysis));
  }
}

export function removeAnalysis(analysisKey) {
  return action(REMOVE_ANALYSIS, analysisKey);
}

export function updateAnalysis(updatedAnalysis) {
  return action(UPDATE_ANALYSIS, updatedAnalysis);
}

export function openDocsFlyout(content) {
  return openFlyout({
    content,
  });
}

function action(type, payload) {
  return { type, payload };
}

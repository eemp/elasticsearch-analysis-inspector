import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AnalysisList from './components';
import { addAnalysis, removeAnalysis, updateAnalysis } from './actions';

function mapStateToProps(state) {
  return {
    analyses: _.get(state, 'analysisReducer'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addAnalysis, removeAnalysis, updateAnalysis }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisList);

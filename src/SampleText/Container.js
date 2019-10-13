import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SampleText from './Component';
import { updateSampleText } from './actions';

function mapStateToProps(state) {
  return {
    text: _.get(state, 'sampletextReducer'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateSampleText }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleText);

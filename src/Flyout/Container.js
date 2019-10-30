import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Flyout from './Component';
import { closeFlyout } from './actions';

function mapStateToProps(state) {
  return _.get(state, 'flyoutReducer') || {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeFlyout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Flyout);

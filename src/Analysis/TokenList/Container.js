import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TokenList from './Component';
import { selectTokens, unselectTokens } from './actions';

function mapStateToProps(state, ownProps) {
  const { tokenlistReducer: selectedTokenOffset, form } = state;
  const { tokens } = ownProps;
  return {
    enableTokenOffsets: _.get(form, 'preferences.values.enable_token_offsets'),
    tokens: _.map(tokens, token => _.assign({}, token, {
      selected: token.start_offset === selectedTokenOffset,
    })),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectTokens, unselectTokens }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenList);

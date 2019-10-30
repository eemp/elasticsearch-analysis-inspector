import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { EuiBadge } from '@elastic/eui';

const TokenList = (props) => {
  const { enableTokenOffsets, selectTokens, tokens, unselectTokens } = props;
  const chips = _.map(tokens, ({ selected, start_offset: offset, token}, idx) => (
    <EuiBadge
      color={selected ? 'primary' : 'default'}
      key={`${offset}-${idx}`}
      onClick={() => selected ? unselectTokens() : selectTokens(offset)}
      onClickAriaLabel={`Select tokens at offset = ${offset}`}
      style={{ margin: 5 }}
    >
      {
        enableTokenOffsets && (
          <span style={{ marginRight: 10, paddingRight: 7, borderRight: '2px solid black' }}>{offset}</span>
        )
      }
      {token}
    </EuiBadge>
  ));
  return (
    <React.Fragment>
      {chips}
    </React.Fragment>
  );
};

TokenList.propTypes = {
  enableTokenOffsets: PropTypes.bool,
  selectTokens: PropTypes.func,
  tokens: PropTypes.arrayOf(PropTypes.object),
  unselectTokens: PropTypes.func,
};

TokenList.defaultProps = {
  enableTokenOffsets: true,
};

export default TokenList;

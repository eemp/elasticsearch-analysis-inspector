import _ from 'lodash';
import React from 'react';

import { EuiBadge } from '@elastic/eui';

const TokenList = (props) => {
  const { onTokenSelect, selectedStartOffset, tokens } = props;
  const chips = _.map(tokens, (tokenDetails, idx) => (
    <EuiBadge
      color={selectedStartOffset === tokenDetails.start_offset ? 'primary' : 'default'}
      key={`${tokenDetails.start_offset}-${idx}`}
      onClick={() => onTokenSelect(tokenDetails.start_offset)}
      onClickAriaLabel={`Select tokens at offset = ${tokenDetails.start_offset}`}
      style={{ margin: 5 }}
    >
      <span style={{ marginRight: 10, paddingRight: 7, borderRight: '2px solid black' }}>{tokenDetails.start_offset}</span>
      {tokenDetails.token}
    </EuiBadge>
  ));
  return (
    <div style={{ marginTop: 24 }}>
      {chips}
    </div>
  );
};

export default TokenList;

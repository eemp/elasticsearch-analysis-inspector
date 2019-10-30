import React from 'react';

import {
  EuiSwitch,
} from '@elastic/eui';

export default function EuiSwitchField(props) {
  const { input, label, meta, ...otherProps } = props;
  return (
    <EuiSwitch checked={input.value} label={label} {...input} {...otherProps} />
  );
}

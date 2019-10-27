import React from 'react';

import {
  EuiSelect,
} from '@elastic/eui';

export default function EuiSelectField(props) {
  const { input, label, meta, ...otherProps } = props;
  return (
    <EuiSelect {...input} {...otherProps} />
  );
}

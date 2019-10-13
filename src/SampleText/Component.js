import React from 'react';

import { EuiFieldText, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

export default function SampleText(props) {
  const { text, updateSampleText } = props;
  return (
    <EuiFlexGroup key="text-sample">
      <EuiFlexItem>
        <EuiFieldText
          fullWidth
          prepend="Text"
          onChange={
            ev => {
              const { value } = ev.target;
              ev.persist();
              updateSampleText(value);
            }
          }
          value={text}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

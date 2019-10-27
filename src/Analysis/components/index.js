import _ from 'lodash';
import React from 'react';

import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';

import Analysis from './Item';

export default function AnalysisList(props) {
  const { analyses, addAnalysis, defaultEditor, editorTheme, removeAnalysis, updateAnalysis, selectedTokenPosition, selectToken, text } = props;
  return (
    <React.Fragment>
      <EuiFlexGroup justifyContent="flexEnd" key="new-analysis">
        <EuiFlexItem grow={false}>
          <EuiButton iconType="plusInCircle" onClick={addAnalysis} style={{float: 'right'}}>New Analysis</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      {
        _.map(analyses, analysis => (
          <EuiFlexGroup key={analysis.key}>
            <EuiFlexItem>
              <Analysis
                {...analysis}
                analysisId={analysis.key}
                defaultEditor={defaultEditor}
                editorTheme={editorTheme}
                key={analysis.key}
                onChange={updateAnalysis}
                onClose={() => removeAnalysis(analysis.key)}
                onTokenSelect={selectToken}
                selectedStartOffset={selectedTokenPosition}
                text={text}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        ))
      }
    </React.Fragment>
  );
}

import React from 'react';

import {
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiIcon,
} from '@elastic/eui';

export default function CustomAppBar(props) {
  return (
    <React.Fragment>
      <EuiHeader>
        <EuiHeaderSection grow={true}>
          <EuiHeaderSectionItem>
            <EuiHeaderLogo id="app-logo" iconType="searchProfilerApp">Elasticsearch Analysis Inspector</EuiHeaderLogo>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem border="none">
            <EuiHeaderLink href="https://github.com/eemp/elasticsearch-analysis-inspector" target="_blank">
              <EuiIcon id="github-link" type="logoGithub" size="l"/>
            </EuiHeaderLink>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </React.Fragment>
  );
}

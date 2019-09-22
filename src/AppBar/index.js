import React from 'react';

import {
  EuiHeader,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiIcon,
} from '@elastic/eui';

export default function CustomAppBar() {
  return (
    <React.Fragment>
      <EuiHeader>
        <EuiHeaderSection grow={true}>
          <EuiHeaderSectionItem>
            <EuiHeaderLogo iconType="searchProfilerApp">Elasticsearch Analysis Inspector</EuiHeaderLogo>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem border="none">
            <EuiHeaderLink href="https://github.com/eemp/elasticsearch-analysis-inspector" target="_blank">
              <EuiIcon type="logoGithub" size="l"/>
            </EuiHeaderLink>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </React.Fragment>
  );
}

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showInfo } from './actions';

import {
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiIcon,
} from '@elastic/eui';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showInfo }, dispatch);
}

function CustomAppBar(props) {
  const { showInfo } = props;
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
          <EuiHeaderSectionItem border="none">
            <EuiHeaderSectionItemButton onClick={showInfo}>
              <EuiIcon type="iInCircle" size="l"/>
            </EuiHeaderSectionItemButton>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </React.Fragment>
  );
}

export default connect(null, mapDispatchToProps)(CustomAppBar);

import _ from 'lodash';
import classNames from 'classnames';
import Joyride from 'react-joyride';
import React from 'react';
import { connect } from 'react-redux';

import { EuiPanel, EuiPopoverTitle, EuiText } from '@elastic/eui';

const commonStepProps = {
  disableBeacon: true,
  placement: 'auto',
};

const steps = [
  {
    target: '#app-logo',
    content: 'Welcome to Elasticsearch Analysis Inspector!',
    floaterProps: {
      hideArrow: true,
      placement: 'center',
    },
    spotlightPadding: 0,
    title: 'Hi there!',
    ...commonStepProps,
  },
  {
    target: '#new-button',
    content: 'Add a analysis definition to compare against others.',
    title: 'Add New Analysis',
    ...commonStepProps,
  },
  {
    target: '#first-editor',
    content: 'Change analysis definition using a code or friendlier editor.',
    title: 'Editor',
    ...commonStepProps,
  },
  {
    target: '#save-button',
    content: 'Save current set of analysis definitions to reload later.',
    title: 'Save Analysis Set',
    ...commonStepProps,
  },
  {
    target: '#saved-items-button',
    content: 'Find your saved items and reload from here.',
    title: 'Reload Saved Items',
    ...commonStepProps,
  },
  {
    target: '#demoes-button',
    content: 'Review premade demoes of various things like tokenizers, stemmers, etc.',
    title: 'Demoes',
    ...commonStepProps,
  },
  {
    target: '#preferences-button',
    content: 'Customize small things to improve your experience.',
    title: 'Preferences',
    ...commonStepProps,
  },
  {
    target: '#github-link',
    content: 'Find the source code and perhaps donate a star to the repo ;)',
    title: 'Open Source on Github',
    ...commonStepProps,
  }
];

function OurJoyride(props) {
  const { run } = props;
  return (
    <Joyride
      continuous={true}
      hideBackButton={true}
      locale={{
        last: 'Finish',
      }}
      run={run}
      scrollToFirstStep={true}
      showSkipButton={true}
      steps={steps}
      styles={{
        options: {
          arrowColor: 'rgba(0, 0, 0, 0.5)',
          backgroundColor: '#fff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          primaryColor: '#006BB4',
          spotlightShadow: '0 0 0 rgba(0, 0, 0, 0.5)',
          textColor: '#333',
          width: undefined,
          zIndex: 1000,
        },
      }}
    />
  );
}

function mapStateFromProps(state) {
  return {
    run: _.get(state, 'joyride.inProgress'),
  };
}

export default connect(mapStateFromProps)(OurJoyride);

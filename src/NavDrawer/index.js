import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  EuiNavDrawer,
  EuiNavDrawerGroup,
} from '@elastic/eui';

import * as actions from './actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function NavDrawer(props) {
  const { openFlyout, showInfo } = props;
  const drawerOptions = [
    {
      label: 'About the App',
      iconType: 'documentEdit',
      onClick: showInfo,
    },
    {
      label: 'Preferences',
      iconType: 'wrench',
      onClick: showPreferences,
    },
    {
      label: 'Settings',
      iconType: 'gear',
      onClick: showSettings,
    },
  ];

  return (
    <EuiNavDrawer>
      <EuiNavDrawerGroup listItems={drawerOptions} />
    </EuiNavDrawer>
  );

  function showPreferences() {
    return openFlyout({
      content: 'Preferences',
      title: 'Preferences',
    });
  }

  function showSettings() {
    return openFlyout({
      content: 'Settings',
      title: 'Settings',
    });
  }
}

export default connect(null, mapDispatchToProps)(NavDrawer);

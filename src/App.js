import React from 'react';
import { Provider } from 'react-redux';

import '@elastic/eui/dist/eui_theme_light.css';

import { EuiFlexGrid, EuiPage, EuiPageBody, EuiSpacer } from '@elastic/eui';

import AnalysisList from './Analysis';
import AppBar from './AppBar';
import AppFlyout from './Flyout';
import configureStore from './store';
import SampleText from './SampleText';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppBar />
        <EuiPage style={{ backgroundColor: '#fbfbfb', marginTop: 20, minHeight: 'calc(100vh-50px)' }}>
          <EuiPageBody restrictWidth>
            <EuiFlexGrid direction="column">
              <SampleText />
              <EuiSpacer />
              <AnalysisList />
            </EuiFlexGrid>
          </EuiPageBody>
        </EuiPage>
        <AppFlyout />
      </React.Fragment>
    );
  }
}

function withStore(App) {
  const store = configureStore();

  return props => (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
}

export default withStore(App);

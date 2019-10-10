import React from 'react';
import { Provider } from 'react-redux';

import '@elastic/eui/dist/eui_theme_light.css';

import { EuiFieldText, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiPage, EuiPageBody, EuiSpacer } from '@elastic/eui';

import AnalysisList from './Analysis';
import AppBar from './AppBar';
import AppFlyout from './Flyout';
import configureStore from './store';

import { sampleText } from './sample-data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: sampleText,
    };
  }

  render() {
    const { text } = this.state;

    return (
      <React.Fragment>
        <AppBar />
        <EuiPage style={{ backgroundColor: '#fbfbfb', marginTop: 20, minHeight: 'calc(100vh-50px)' }}>
          <EuiPageBody restrictWidth>
            <EuiFlexGrid direction="column">
              <EuiFlexGroup key="text-sample">
                <EuiFlexItem>
                  <EuiFieldText
                    fullWidth
                    prepend="Text"
                    onChange={
                      ev => {
                        const text = ev.target.value;
                        ev.persist();
                        this.setState({text});
                      }
                    }
                    value={text}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer />
              <AnalysisList text={text} />
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

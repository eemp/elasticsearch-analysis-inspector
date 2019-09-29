import _ from 'lodash';
import React from 'react';
import uuid from 'uuid/v4';
import { Provider } from 'react-redux';

import '@elastic/eui/dist/eui_theme_light.css';

import { EuiButton, EuiFieldText, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiPage, EuiPageBody, EuiSpacer } from '@elastic/eui';

import Analysis, { EDIT_MODE } from './Analysis';
import AppBar from './AppBar';
import AppFlyout from './Flyout';
import configureStore from './store';
import updateAnalyses from './services/analyze';

import { analyses, sampleText } from './sample-data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: sampleText,
      analyses,
    };
    this.createCloseFn = this.createCloseFn.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onChange = _.debounce(
      this.onChange.bind(this),
      750
    );
    this.onClose = this.onClose.bind(this);
    this.onTokenSelect = this.onTokenSelect.bind(this);
  }

  createCloseFn(analysisKey) {
    return () => {
      this.onClose(analysisKey);
    };
  }

  onClose(analysisKey) {
    const { analyses } = this.state;
    this.setState({
      analyses: _.filter(analyses, (analysis, idx) =>
        analysis.key !== analysisKey && analysisKey !== idx
      ),
    });
  }

  onChange() {
    const { analyses, text } = this.state;
    updateAnalyses(analyses, text).then(updatedAnalyses =>
      this.setState({ analyses: updatedAnalyses })
    );
  }

  onAdd() {
    const { analyses } = this.state;
    const newAnalysis = _.assign({}, analyses[0], {
      key: uuid(),
      mode: EDIT_MODE,
    });
    this.setState({
      analyses: _.concat(newAnalysis, analyses),
    });
  }

  onTokenSelect(startOffset) {
    const { selectedStartOffset } = this.state;
    const updatedVal = selectedStartOffset === startOffset
      ? null
      : startOffset
    ;
    this.setState({
      selectedStartOffset: updatedVal,
    });
  }

  render() {
    const { analyses, selectedStartOffset, text } = this.state;

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
                        this.setState({text}, this.onChange);
                      }
                    }
                    value={text}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer />
              <EuiFlexGroup justifyContent="flexEnd" key="new-analysis">
                <EuiFlexItem grow={false}>
                  <EuiButton iconType="plusInCircle" onClick={this.onAdd} style={{float: 'right'}}>New Analysis</EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer />
              {
                _.map(analyses, analysis => (
                  <EuiFlexGroup key={analysis.key}>
                    <EuiFlexItem>
                      <Analysis
                        {...analysis}
                        key={analysis.key}
                        onClose={this.createCloseFn(analysis.key)}
                        onTokenSelect={this.onTokenSelect}
                        selectedStartOffset={selectedStartOffset}
                        text={text}
                      />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                ))
              }
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

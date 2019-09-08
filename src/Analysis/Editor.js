import _ from 'lodash';
import inflection from 'inflection';
import MonacoEditor from 'react-monaco-editor';
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CodeIcon from '@material-ui/icons/Code';
import DescriptionIcon from '@material-ui/icons/Description';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ANALYZERS, { CHAR_FILTERS, TOKEN_FILTERS, TOKENIZERS } from './analyzers';
import Select from '../Select';

const ANALYZER_OPTIONS = _.map(ANALYZERS, toSelectOption);
const CHAR_FILTER_OPTIONS = _.map(CHAR_FILTERS, toSelectOption);
const TOKENIZER_OPTIONS = _.map(TOKENIZERS, toSelectOption);
const TOKEN_FILTER_OPTIONS = _.map(TOKEN_FILTERS, toSelectOption);

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editorWillMount = this.editorWillMount.bind(this);
    this.onAnalyzerChange = this.onDefinitionChange.bind(this, 'analyzer');
    this.onCharFilterChange = this.onDefinitionChange.bind(this, 'char_filter');
    this.onTokenizerChange = this.onDefinitionChange.bind(this, 'tokenizer');
    this.onTokenFilterChange = this.onDefinitionChange.bind(this, 'filter');
    this.onDefinitionChange = this.onDefinitionChange.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.state = {
      editorContent: props.content && JSON.stringify(props.content, null, 2),
      selectedTab: 1,
      ...toFriendlyRep(props.content),
    };
  }

  editorWillMount(monaco) {
    /*
     * Missing monaco webpack plugin?
     */
    //monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      //validate: true,
    //});
  }

  onTabChange(event, selectedTab) {
    this.setState({ selectedTab });
    if(selectedTab === 1) {
      this.setState({
        editorContent: this.refs.monaco.editor.getValue(),
        ...toFriendlyRep(this.refs.monaco.editor.getValue()),
      });
    }
  }

  onDefinitionChange(field, value) {
    let { analyzer, char_filter, filter, tokenizer } = this.state;
    if(field === 'analyzer' && value.value === 'custom') {
      char_filter = tokenizer = filter = undefined;
    }

    this.setState({
      [field]: value,
      editorContent: JSON.stringify({
        analyzer: _.get(analyzer, 'value') !== 'custom'
          ? _.get(analyzer, 'value')
          : undefined,
        char_filter: char_filter
          ? char_filter.map(option => option.value)
          : undefined,
        filter: filter
          ? filter.map(option => option.value)
          : undefined,
        tokenizer: _.get(tokenizer, 'value'),
        [field]: _.isArray(value)
          ? _.map(value, option => option.value)
          : value,
      }, null, 2),
    });
  }

  render() {
    const { analyzer, char_filter, editorContent, filter, tokenizer, selectedTab } = this.state;

    function TabPanel(props) {
      const { children, tabIdx } = props;

      return (
        <Box hidden={selectedTab !== tabIdx}>
          {children}
        </Box>
      );
    }

    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            indicatorColor="primary"
            onChange={this.onTabChange}
            textColor="primary"
            value={selectedTab}
            variant="fullWidth"
          >
            <Tab icon={<CodeIcon/>} />
            <Tab icon={<DescriptionIcon/>} />
          </Tabs>
        </AppBar>
        <TabPanel tabIdx={0}>
          <MonacoEditor
            defaultValue={editorContent}
            editorWillMount={this.editorWillMount}
            height={200}
            language="json"
            ref="monaco"
            theme="vs-dark"
          />
        </TabPanel>
        <TabPanel tabIdx={1}>
          <Paper elevation={3} square={true} style={{paddingTop: 20, paddingBottom: 40}}>
            <Container>
              <Select
                onChange={this.onAnalyzerChange}
                options={ANALYZER_OPTIONS}
                placeholder="Select an analyzer type:"
                value={analyzer}
              />
            </Container>
            <div style={{visibility: _.get(analyzer, 'value') !== 'custom' && 'hidden'}}>
              <Container>
                <Select
                  onChange={this.onTokenizerChange}
                  options={TOKENIZER_OPTIONS}
                  placeholder="Select a tokenizer:"
                  value={tokenizer}
                />
              </Container>
              <Container>
                <Select
                  isMulti
                  onChange={this.onCharFilterChange}
                  options={CHAR_FILTER_OPTIONS}
                  placeholder="Select a character filter:"
                  value={char_filter}
                />
              </Container>
              <Container>
                <Select
                  isMulti
                  onChange={this.onTokenFilterChange}
                  options={TOKEN_FILTER_OPTIONS}
                  placeholder="Select a token filter:"
                  value={filter}
                />
              </Container>
            </div>
          </Paper>
        </TabPanel>
      </div>
    );
  }
}

export default Editor;

function toSelectOption(value) {
  if(!value) {
    return value;
  }

  return _.isArray(value) ? _.map(value, toSelectOption) : {
    label: inflection.humanize(value),
    value,
  };
}

function toFriendlyRep(jsonDef) {
  const def = _.isString(jsonDef)
    ? JSON.parse(jsonDef)
    : jsonDef;

  const analyzer = 'custom';
  const { char_filter, filter, tokenizer } = (def || {});

  return {
    analyzer: toSelectOption(analyzer),
    char_filter: toSelectOption(char_filter),
    filter: toSelectOption(filter),
    tokenizer: toSelectOption(tokenizer),
  };
}

import _ from 'lodash';
import inflection from 'inflection';
import MonacoEditor, { MonacoDiffEditor } from 'react-monaco-editor';
import React from 'react';

import { EuiComboBox, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiIcon, EuiSpacer, EuiTabbedContent, EuiTextColor } from '@elastic/eui';

import ANALYZERS, { CHAR_FILTERS, TOKEN_FILTERS, TOKENIZERS } from '../analyzers';

const ANALYZER_OPTIONS = _.map(ANALYZERS, 'value').map(toSelectOption);
const CHAR_FILTER_OPTIONS = _.map(CHAR_FILTERS, 'value').map(toSelectOption);
const TOKENIZER_OPTIONS = _.map(TOKENIZERS, 'value').map(toSelectOption);
const TOKEN_FILTER_OPTIONS = _.map(TOKEN_FILTERS, 'value').map(toSelectOption);

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editorWillMount = this.editorWillMount.bind(this);
    this.onAnalyzerChange = this.onDefinitionChange.bind(this, 'analyzer');
    this.onCharFilterChange = this.onDefinitionChange.bind(this, 'char_filter');
    this.onCodeEditorChange = _.debounce(this.onCodeEditorChange.bind(this), 800);
    this.onTabChange = this.onTabChange.bind(this);
    this.onTokenizerChange = this.onDefinitionChange.bind(this, 'tokenizer');
    this.onTokenFilterChange = this.onDefinitionChange.bind(this, 'filter');
    this.onDefinitionChange = this.onDefinitionChange.bind(this);
    this.state = {
      editorContent: props.content && JSON.stringify(props.content, null, 2),
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

  onDefinitionChange(field, value) {
    const ourValue = this.getValue();
    if(field === 'analyzer' && _.get(value, '0.value') === 'custom') {
      ourValue.char_filter = ourValue.tokenizer = ourValue.filter = undefined;
    }

    this.setState({
      [field]: value,
      editorContent: JSON.stringify({
        ...ourValue,
        [field]: _.isArray(value)
          ? _.map(value, option => option.value)
          : value,
      }, null, 2),
    });
  }

  onCodeEditorChange(codeEditorValue) {
    const err = this.validateCodeEditorValue(codeEditorValue);
    this.setState({
      validation: {
        codeEditor: err,
      }
    });
  }

  validateCodeEditorValue(codeEditorValue) {
    const possibleErr = _.attempt(JSON.parse.bind(null, codeEditorValue));
    return _.isError(possibleErr) && possibleErr;
  }

  onTabChange(selectedTab) {
    this.setState({ selectedTab });
    if(selectedTab.id !== 'code') {
      this.setState({
        editorContent: this.getEditorValue(),
        ...toFriendlyRep(this.getEditorValue()),
      });
    }
  }

  getEditorValue() {
    const { diffEditor } = this.props;
    return diffEditor
      ? this.refs.monaco.editor.getModifiedEditor().getValue()
      : this.refs.monaco.editor.getValue();
  }

  getValue() {
    const { analyzer, char_filter, filter, selectedTab, tokenizer } = this.state;
    return _.get(selectedTab || this.getInitialTab(), 'id') === 'code'
      ? JSON.parse(this.getEditorValue())
      : {
        analyzer: _.get(analyzer, '0.value') !== 'custom'
          ? _.get(analyzer, '0.value')
          : undefined,
        char_filter: char_filter
          ? char_filter.map(option => option.value)
          : undefined,
        filter: filter
          ? filter.map(option => option.value)
          : undefined,
        tokenizer: _.get(tokenizer, '0.value'),
      };
  }

  getEditorTabs() {
    const { diffEditor, theme } = this.props;
    const { analyzer, char_filter, editorContent, filter, tokenizer, validation } = this.state;
    const codeEditorError = _.get(validation, 'codeEditor');

    const CodeEditor = diffEditor ? MonacoDiffEditor : MonacoEditor;

    return [
      {
        id: 'form',
        name: (
          <EuiFlexGroup alignItems="center" direction="column" gutterSize="s">
            { /* <EuiFlexItem>Form</EuiFlexItem> */ }
            <EuiFlexItem><EuiIcon type="documentEdit" /></EuiFlexItem>
          </EuiFlexGroup>
        ),
        content: (
          <EuiForm style={{paddingTop: 20, paddingBottom: 40}}>
            <EuiFormRow fullWidth label="Analyzer">
              <EuiComboBox
                fullWidth
                onChange={this.onAnalyzerChange}
                options={ANALYZER_OPTIONS}
                placeholder="Select an analyzer type"
                selectedOptions={analyzer}
                singleSelection={{ asPlainText: true }}
              />
            </EuiFormRow>
            <div style={{visibility: _.get(analyzer, '0.value') !== 'custom' && 'hidden'}}>
              <EuiSpacer />
              <EuiFormRow fullWidth label="Tokenizer">
                <EuiComboBox
                  fullWidth
                  onChange={this.onTokenizerChange}
                  options={TOKENIZER_OPTIONS}
                  placeholder="Select a tokenizer"
                  selectedOptions={tokenizer}
                  singleSelection={{ asPlainText: true }}
                />
              </EuiFormRow>
              <EuiFormRow fullWidth label="Character Filters">
                <EuiComboBox
                  fullWidth
                  onChange={this.onCharFilterChange}
                  options={CHAR_FILTER_OPTIONS}
                  placeholder="Select character filters"
                  selectedOptions={char_filter}
                />
              </EuiFormRow>
              <EuiFormRow fullWidth label="Token Filters">
                <EuiComboBox
                  fullWidth
                  onChange={this.onTokenFilterChange}
                  options={TOKEN_FILTER_OPTIONS}
                  placeholder="Select token filters"
                  selectedOptions={filter}
                />
              </EuiFormRow>
            </div>
          </EuiForm>
        ),
      },
      {
        id: 'code',
        name: (
          <EuiFlexGroup alignItems="center" direction="column" gutterSize="s">
            { /* <EuiFlexItem>Code</EuiFlexItem> */ }
            <EuiFlexItem><EuiIcon type="editorCodeBlock" /></EuiFlexItem>
          </EuiFlexGroup>
        ),
        content: (
          <React.Fragment>
            <CodeEditor
              defaultValue={editorContent}
              editorWillMount={this.editorWillMount}
              height={200}
              language="json"
              onChange={this.onCodeEditorChange}
              options={{ renderSideBySide: false }}
              original={editorContent}
              ref="monaco"
              theme={theme}
            />
            {
              codeEditorError ? (
                <EuiTextColor color="danger">Invalid JSON provided</EuiTextColor>
              ) : null
            }
          </React.Fragment>
        ),
      },
    ];
  }

  getInitialTab() {
    const { defaultEditor } = this.props;
    const tabs = this.getEditorTabs();
    return defaultEditor === 'code' ? tabs[1] : tabs[0];
  }

  render() {
    const tabs = this.getEditorTabs();

    return (
      <EuiTabbedContent
        initialSelectedTab={this.getInitialTab()}
        tabs={tabs}
        onTabClick={this.onTabChange}
      />
    );
  }
}

export default Editor;

function toSelectOption(value) {
  if(!value) {
    return value;
  }

  return _.isArray(value) ? _.map(value, toSelectOption) : {
    label: inflection.humanize(
      _.isPlainObject(value) ? value.type : value
    ),
    value,
  };
}

function toFriendlyRep(jsonDef) {
  const def = _.isString(jsonDef)
    ? JSON.parse(jsonDef)
    : jsonDef;

  const { analyzer = 'custom', char_filter, filter, tokenizer } = (def || {});

  return {
    analyzer: _.compact(_.castArray(toSelectOption(analyzer))),
    char_filter: toSelectOption(char_filter),
    filter: toSelectOption(filter),
    tokenizer: _.compact(_.castArray(toSelectOption(tokenizer))),
  };
}

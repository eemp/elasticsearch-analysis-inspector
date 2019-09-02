import MonacoEditor from 'react-monaco-editor';
import React from 'react';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editorWillMount = this.editorWillMount.bind(this);
  }

  editorWillMount(monaco) {
    /*
     * Missing monaco webpack plugin?
     */
    //monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      //validate: true,
    //});
  }

  render() {
    const { content } = this.props;
    const editorContent = JSON.stringify(content, null, 2);

    return (
      <MonacoEditor
        defaultValue={editorContent}
        editorWillMount={this.editorWillMount}
        height={200}
        language="json"
        ref="monaco"
        theme="vs-dark"
      />
    );
  }
}

export default Editor;

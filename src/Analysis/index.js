import _ from 'lodash';
import React from 'react';

import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiFieldText, EuiTitle } from '@elastic/eui';

import Description from './Description';
import Editor from './Editor';
import TokenList from './TokenList';
import { updateAnalysis } from '../services/analyze';

export const EDIT_MODE = 'edit';
export const VISUAL_MODE = 'visual';

const DEFAULT_NAME = 'New Analyzer';

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode || VISUAL_MODE,
      name: props.name || DEFAULT_NAME,
    };
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onEdit() {
    this.setState({
      mode: EDIT_MODE,
    });
  }

  onChange() {
    const { onChange } = this.props;
    const updatedDefinition = this.refs.editor.getValue();
    this.setState({
      mode: VISUAL_MODE,
      name: this.nameField.value,
    });
    _.isFunction(onChange) && onChange({
      definition: updatedDefinition,
      name: this.nameField.value,
    });
  }

  inEditMode() {
    const { mode } = this.state;
    return mode === EDIT_MODE;
  }

  render() {
    const { definition, description, onClose } = this.props;
    const { name } = this.state;
    return (
      <EuiPanel>
        <EuiFlexGroup responsive={false} style={{ marginBottom: 10 }}>
          <EuiFlexItem grow={true}>
            {
              this.inEditMode()
                ? <EuiFieldText
                  defaultValue={name}
                  inputRef={ref => this.nameField = ref}
                  prepend="Analysis Name"
                />
                : <EuiTitle><h3>{name}</h3></EuiTitle>
            }
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup responsive={false}>
              <EuiFlexItem>
                {
                  this.inEditMode()
                    ? <EuiButtonIcon aria-label="confirm" iconType="check" onClick={this.onChange} />
                    : <EuiButtonIcon aria-label="edit" iconType="pencil" onClick={this.onEdit} />
                }
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButtonIcon aria-label="close" onClick={onClose} iconType="trash"/>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
        {
          !this.inEditMode()
            ? <p>{description}</p>
            : null
        }
        {
          this.inEditMode()
            ? <Editor content={definition} ref="editor" />
            : <TokenList {...this.props} />
        }
      </EuiPanel>
    );
  }
}

function withLiveAnalyze(Component) {
  class WithLiveAnalysis extends React.Component {
    constructor(props) {
      const { definition, tokens } = props;
      super(props);
      this.onChange = this.onChange.bind(this);
      this.triggerAnalysis = _.debounce(
        this.triggerAnalysis.bind(this),
        750
      );
      this.state = {
        definition,
        tokens,
      };
    }

    componentDidMount() {
      this.triggerAnalysis();
    }

    componentDidUpdate(prevProps, prevState) {
      const { text } = this.props;
      const { text: prevText } = prevProps;

      if(text !== prevText) {
        this.triggerAnalysis();
      }
    }

    onChange({ definition }) {
      this.setState({
        definition,
      }, this.triggerAnalysis);
    }

    triggerAnalysis() {
      const { text } = this.props;
      const { definition } = this.state;

      updateAnalysis({ definition }, text).then(({ tokens }) => {
        this.setState({
          description: <Description {...definition} />,
          tokens,
        });
      });
    }

    render() {
      const { definition, description, tokens } = this.state;
      return (
        <Component
          {...this.props}
          definition={definition}
          description={description}
          onChange={this.onChange}
          tokens={tokens}
        />
      );
    }
  }

  return WithLiveAnalysis;
}

export default withLiveAnalyze(Analysis);

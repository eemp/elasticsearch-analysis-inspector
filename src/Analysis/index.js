import _ from 'lodash';
import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Editor from './Editor';
import { updateAnalysis } from '../services/analyze';

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(1),
  },
}));

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
    const updatedDefinition = JSON.parse(this.refs.editor.refs.monaco.editor.getValue());
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
    const { className, definition, description, onClose } = this.props;
    const { name } = this.state;
    return (
      <Card className={className}>
        <CardHeader
          action={
            <CardActions disableSpacing>
              {
                this.inEditMode()
                  ? <IconButton onClick={this.onChange}>
                    <DoneIcon />
                  </IconButton>
                  : <IconButton onClick={this.onEdit}>
                    <EditIcon />
                  </IconButton>
              }
              <IconButton onClick={onClose}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          }
          subheader={!this.inEditMode() && description}
          title={
            this.inEditMode()
              ? <TextField inputRef={ref => this.nameField = ref} defaultValue={name} />
              : name
          }
        />
        <CardContent>
          {
            this.inEditMode()
              ? <Editor content={definition} ref="editor" />
              : <TokenChips {...this.props} />
          }
        </CardContent>
      </Card>
    );
  }
}

function withLiveAnalyze(Component) {
  class WithLiveAnalysis extends React.Component {
    constructor(props) {
      const { definition, tokens } = props;
      super(props);
      this.onChange = this.onChange.bind(this);
      this.updateAnalysis = this.updateAnalysis.bind(this);
      this.state = {
        definition,
        tokens,
      };
    }

    componentDidMount() {
      this.updateAnalysis();
    }

    onChange({ definition }) {
      this.setState({
        definition,
      }, this.updateAnalysis);
    }

    updateAnalysis() {
      const { text } = this.props;
      const { definition } = this.state;
      const description = describeAnalyzer(definition);

      updateAnalysis({ definition }, text).then(({ tokens }) => {
        this.setState({
          description,
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

const TokenChips = (props) => {
  const { onTokenSelect, selectedStartOffset, tokens } = props;
  const styles = useStyles();
  const chips = _.map(tokens, tokenDetails => (
    <Chip
      avatar={<Avatar>{tokenDetails.start_offset}</Avatar>}
      className={styles.chip}
      color={selectedStartOffset === tokenDetails.start_offset ? 'primary' : undefined}
      key={tokenDetails.start_offset}
      label={tokenDetails.token}
      onClick={() => onTokenSelect(tokenDetails.start_offset)}
    />
  ));
  return (
    <React.Fragment>
      {chips}
    </React.Fragment>
  );
};

function describeAnalyzer(definition) {
  const { analyzer, char_filter:charFilter, filter, tokenizer } = definition;
  return _.compact([
    analyzer && `Analyzer: ${analyzer}`,
    tokenizer && `Tokenizer: ${tokenizer}`,
    charFilter && `Character Filters: ${_.castArray(charFilter).map(analyzerAspectToString).join(' + ')}`,
    filter && `Filters: ${_.castArray(filter).map(analyzerAspectToString).join(' + ')}`,
  ]).join(', ');
}

function analyzerAspectToString(piece) {
  return JSON.stringify(_.isPlainObject(piece) ? piece.type : piece);
}

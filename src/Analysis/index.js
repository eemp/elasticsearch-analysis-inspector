import _ from 'lodash';
import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import Editor from './Editor';
import { updateAnalysis } from '../services/analyze';

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(1),
  },
}));

const EDIT_MODE = 'edit';
const VISUAL_MODE = 'visual';

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: VISUAL_MODE,
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
    });
    _.isFunction(onChange) && onChange(updatedDefinition);
  }

  inEditMode() {
    const { mode } = this.state;
    return mode === EDIT_MODE;
  }

  render() {
    const { className, definition, description, name, onClose } = this.props;
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
          subheader={description}
          title={`${name} Analyzer`}
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

    onChange(definition) {
      this.setState({
        definition,
      }, this.updateAnalysis);
    }

    updateAnalysis() {
      const { text } = this.props;
      const { definition } = this.state;
      updateAnalysis({ definition }, text).then(({ tokens }) => {
        this.setState({
          tokens,
        });
      });
    }

    render() {
      const { definition, tokens } = this.state;
      return (
        <Component
          {...this.props}
          definition={definition}
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
  const { tokens } = props;
  const styles = useStyles();
  const chips = _.map(tokens, tokenDetails => (
    <Chip
      className={styles.chip}
      key={tokenDetails.position}
      label={tokenDetails.token}
    />
  ));
  return (
    <React.Fragment>
      {chips}
    </React.Fragment>
  );
};

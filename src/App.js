import _ from 'lodash';
import React from 'react';
import uuid from 'uuid/v4';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Analysis, { EDIT_MODE } from './Analysis';
import theme from './theme';
import updateAnalyses from './services/analyze';

import { analyses, sampleText } from './sample-data';

const useStyles = makeStyles(theme => ({
  app: {
    backgroundColor: '#fbfbfb',
  },
  appBarSpacer: theme.mixins.toolbar,
  chip: {
    margin: theme.spacing(1),
  },
  section: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
}));

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
    const { classes: styles } = this.props;
    const { analyses, selectedStartOffset, text } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className={styles.app}>
          <AppBar position="absolute">
            <Toolbar>
              <Typography variant="h6">Elasticsearch Analysis Inspector</Typography>
            </Toolbar>
          </AppBar>
          <div className={styles.appBarSpacer} />
          <Grid container>
            <Grid item xs={12}>
              <Container className={styles.section}>
                <TextField
                  defaultValue={text}
                  fullWidth
                  label="Text"
                  onChange={
                    ev => {
                      const text = ev.target.value;
                      ev.persist();
                      this.setState({text}, this.onChange);
                    }
                  }
                  variant="outlined"
                />
              </Container>
            </Grid>
            <Grid item xs={12}>
              <Container>
                <Button variant="contained" color="secondary" onClick={this.onAdd} style={{float: 'right'}}>New Analyzer</Button>
              </Container>
            </Grid>
            <Grid item xs={12}>
              <Container>
                {
                  _.map(analyses, analysis => (
                    <Analysis
                      {...analysis}
                      className={styles.section}
                      key={analysis.key}
                      onClose={this.createCloseFn(analysis.key)}
                      onTokenSelect={this.onTokenSelect}
                      selectedStartOffset={selectedStartOffset}
                      text={text}
                    />
                  ))
                }
              </Container>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}

function withStyles() {
  return props => {
    const styles = useStyles();
    return <App classes={styles} {...props} />;
  };
}

export default withStyles(App);

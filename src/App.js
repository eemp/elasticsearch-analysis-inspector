import _ from 'lodash';
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//import { makeStyles, withStyles } from '@material-ui/styles';

import Analysis from './Analysis';
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
    this.onChange = _.debounce(
      this.onChange.bind(this),
      750
    );
    this.onClose = this.onClose.bind(this);
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

  render() {
    const { classes: styles } = this.props;
    const { analyses, text } = this.state;

    return (
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
              {
                _.map(analyses, (analysis, idx) => (
                  <Analysis
                    {...analysis}
                    className={styles.section}
                    key={idx}
                    onClose={this.createCloseFn(idx)}
                    text={text}
                  />
                ))
              }
            </Container>
          </Grid>
        </Grid>
      </div>
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

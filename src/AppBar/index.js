import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import GithubIconLink from './GithubIconLink';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
}));

export default function CustomAppBar() {
  const styles = useStyles();

  return (
    <React.Fragment>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>Elasticsearch Analysis Inspector</Typography>
          <GithubIconLink href="https://github.com/eemp/elasticsearch-analysis-inspector"/>
        </Toolbar>
      </AppBar>
      <div className={styles.appBarSpacer} />
    </React.Fragment>
  );
}

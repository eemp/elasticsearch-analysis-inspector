import _ from 'lodash';
import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(1),
  },
}));

const Analysis = (props) => {
  const { className, description, name, onClose } = props;
  return (
    <Card className={className}>
      <CardHeader
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        subheader={description}
        title={`${name} Analyzer`}
      />
      <CardContent>
        <TokenChips {...props} />
      </CardContent>
    </Card>
  );
};

export default Analysis;

const TokenChips = (props) => {
  const { tokens } = props;
  const styles = useStyles();
  const chips = _.map(tokens, token => (
    <Chip className={styles.chip} label={token} />
  ));
  return (
    <React.Fragment>
      {chips}
    </React.Fragment>
  );
};

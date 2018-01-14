import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

const CircularIndeterminate = (props) => {
  const { classes } = props;
  return (
    <CircularProgress className={classes.progress} />
  )
}

export default withStyles(styles)(CircularIndeterminate);
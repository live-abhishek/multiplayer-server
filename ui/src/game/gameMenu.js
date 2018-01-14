import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const gameMenu = (props) => {
  const { classes, requestHandler } = props;
  return (
    <div>
      < Button raised color="primary" className={classes.button} onClick={requestHandler}>
        Tic-Tac-Toe-1
      </Button >
      < Button raised color="accent" className={classes.button} onClick={requestHandler}>
        Tic-Tac-Toe-2
      </Button >
    </div>
  )
}

export default withStyles(styles)(gameMenu);
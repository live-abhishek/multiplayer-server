import React from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import SimpleMediaCard from "../components/simpleMediaCard";
import tictactoeImage from "./tic-tac-toe/tic-tac-toe.png";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const gameMenu = props => {
  const clickHandler = param => () => {
    props.requestHandler(param);
  };
  const { classes } = props;
  return (
    <div>
      <SimpleMediaCard
        onClick={clickHandler("tictactoe")}
        image={tictactoeImage}
        title="Tic-Tac-Toe-1"
        detail="blah blah blah"
      />
      <SimpleMediaCard
        onClick={clickHandler("tictactoe2")}
        image={tictactoeImage}
        title="Tic-Tac-Toe-2"
        detail="double blah"
      />
      <Button raised color="primary" className={classes.button}>
        Tic-Tac-Toe-1
      </Button>
      <Button raised color="accent" className={classes.button}>
        Tic-Tac-Toe-2
      </Button>
    </div>
  );
};

export default withStyles(styles)(gameMenu);

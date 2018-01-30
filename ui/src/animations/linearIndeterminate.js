import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { LinearProgress } from "material-ui/Progress";

const styles = {
  root: {
    width: "100%",
    verticalAlign: "middle"
  }
};

function LinearIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
}

LinearIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LinearIndeterminate);

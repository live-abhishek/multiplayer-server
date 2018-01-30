import React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, { DialogActions, DialogContent } from "material-ui/Dialog";

class TTTMatchOverDialog extends React.Component {
  handleRestart = () => {};

  handleClose = () => {};

  render() {
    return (
      <Dialog
        open={this.props.open}
        ignoreBackdropClick={true}
        ignoreEscapeKeyUp={true}
      >
        <DialogActions>
          <Button
            onClick={this.handleRestart}
            color="primary"
            disabled={this.state.nickname ? false : true}
          >
            Restart
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            color="primary"
            disabled={this.state.nickname ? false : true}
          >
            Main Menu
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TTTMatchOverDialog;

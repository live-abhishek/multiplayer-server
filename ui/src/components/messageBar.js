import React from "react";
import Snackbar from 'material-ui/Snackbar';

class MessageBar extends React.Component {
  state = {
    open: true,
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {this.props.reason && (<Snackbar
          anchorOrigin={{
            vertical: 'bottom', horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={< span id="message-id" >{this.props.reason}</span >}
        />)}
      </div>
    )
  }
}

export default MessageBar;
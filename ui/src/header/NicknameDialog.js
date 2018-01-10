import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';
import Cookies from 'universal-cookie';

class NicknameDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      nickname: ''
    };
    this.cookieName = 'nickname';
    this.cookies = new Cookies();
  }

  componentWillMount() {
    this.setState({ nickname: this.cookies.get(this.cookieName) || '' });
  }

  handleRequestClose = () => {
    this.setState({ open: false });
    this.cookies.set(this.cookieName, this.state.nickname, { path: '/' });
  };

  handleTextFieldOnChange = (e) => {
    this.setState({ nickname: e.target.value });
  }

  render() {
    return (
      <div>
        <Dialog open={this.state.open} ignoreBackdropClick={true} ignoreEscapeKeyUp={true}>
          <DialogContent>
            <TextField value={this.state.nickname} autoFocus margin="dense" id="nickname" label="Enter your nickname" onChange={this.handleTextFieldOnChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary" disabled={this.state.nickname ? false : true}>
              Sumbit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default NicknameDialog
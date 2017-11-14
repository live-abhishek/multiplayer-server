import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
} from 'material-ui/Dialog';

class NicknameDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            nickname: ''
        };
    }
    
    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleTextFieldOnChange = (e) => {
        this.setState({nickname: e.target.value});
    }

    render(){
        return(
            <div>
                <Dialog open={this.state.open} ignoreBackdropClick={true} ignoreEscapeKeyUp={true}>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="nickname" label="Enter your nickname" onChange={this.handleTextFieldOnChange}/>
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
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Slide, TextField } from '@material-ui/core';
import { navigate } from 'react-mini-router';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

/**
 * Invalid new user password or user name view
 */
export default class GetPasswordDialogView extends React.Component {

    ChangeView(page) {
        navigate(page);
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            email: '',
        };
    }

    handleEventChange = () => event => {
        this.setState({
            email: event.target.value,
        });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return(
            <div>
                <Dialog open={this.state.open} TransitionComponent={Transition} onClose={this.handleClose}>
                    <DialogTitle>
                        Get Back Password
                    </DialogTitle>
                    <DialogContent>
                        <br />
                        <p>Please enter the user email to get back the password.</p>
                        <form>
                            <TextField
                                required
                                label="User Email"
                                margin="dense"
                                type="email"
                                className="registerText"
                                value={this.state.email}
                                onChange={this.handleEventChange()}
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button type="button" color="primary" >Send Email</Button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
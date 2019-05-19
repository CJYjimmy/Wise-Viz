import React from 'react';
import { Typography, Button, ListItem, Grid, TextField, InputAdornment, FormControlLabel, Switch } from '@material-ui/core';
import './component_style/Register.css';
import { navigate } from 'react-mini-router';
import {Helmet} from 'react-helmet';

/**
 *
 *
 */
export default class Register extends React.Component {
    ChangeView(page) {
        navigate(page);
    }

    constructor(props) {
        super(props);
        this.state = {
            newUserData: {
                userName: '',
                password: '',
                reenterPassword: ''
            },
        };
        this.addNewAccount = this.addNewAccount.bind(this);
        //this.showError = React.createRef();
    }

    handleEventChange = field => event => {
        const oldData = this.state.newUserData;
        oldData[field] = event.target.value;
        this.setState({
            newUserData: oldData,
        });
    }

    componentDidMount() {

    }

    addNewAccount(event) {
        event.preventDefault();
        let data = {
            userName: this.state.newUserData.userName,
            password: this.state.newUserData.password
        };
        let request = new Request('http://localhost:3000/api/new-user', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });
        console.log(JSON.stringify(data));

        fetch(request)
            .then(function(response) {
                response.json().then(function(data) {
                    console.log(data)
                })
        });
    }

    render() {
        return (
            <div className="newUser">
                <Helmet>
                    <style>{'body { background-color: #eeeeee; }'}</style>
                </Helmet>
                <br />
                <Typography variant="h4" align="center" gutterBottom>New User</Typography>
                <form className="eventForm" onSubmit={this.addNewAccount}>
                    <TextField
                        required
                        label="User Name"
                        margin="dense"
                        className="registerText"
                        value={this.state.newUserData.userName}
                        onChange={this.handleEventChange('userName')}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br />
                    <TextField
                        required
                        label="Password"
                        margin="dense"
                        className="registerText"
                        value={this.state.newUserData.password}
                        onChange={this.handleEventChange('password')}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br />
                    <TextField
                        required
                        label="Reenter Password"
                        margin="dense"
                        className="registerText"
                        value={this.state.newUserData.reenterPassword}
                        onChange={this.handleEventChange('reenterPassword')}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br /> <br />
                    <Button
                        variant="contained"
                        className="buttons"
                        type="button"
                        onClick={() => this.ChangeView('/')}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        className="buttons"
                        type="submit"
                        color="primary"
                    >
                        Register
                    </Button>
                </form>
            </div>
        );
    }

}
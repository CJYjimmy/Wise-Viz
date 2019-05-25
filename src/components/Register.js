import React from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import './component_style/Register.css';
import { navigate } from 'react-mini-router';
import {Helmet} from 'react-helmet';
import InvalidNewUserView from './InvalidNewUserError';
import RegisterSucceedView from './RegisterSucceed';

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
                reenterPassword: '',
                erroInfo: ''
            },
            items: [],
        };
        this.addNewAccount = this.addNewAccount.bind(this);
        this.checkUserInfoAndAdd = this.checkUserInfoAndAdd.bind(this);
        this.existUsername = this.existUsername.bind(this);
        this.invalidNewUserErrorChild = React.createRef();
        this.registerSucceedChild = React.createRef();
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

    // go to database to check whether the account has been registered and
    // go to check whether the password and reentered password are same
    // if the new account information are all valid, then put the info into DB.
    checkUserInfoAndAdd() {
        let data = {
            userName: this.state.newUserData.userName
        };
        let request = new Request('http://localhost:3000/api/user-info/check-username-unique', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });
        fetch(request)
            .then(response => response.json())
            .then(items => this.setState({items}))
            .then((event) => {
                let data = {
                    userName: this.state.newUserData.userName,
                    password: this.state.newUserData.password
                };
                let reenterPassword = this.state.newUserData.reenterPassword;
                if (reenterPassword === data.password && !this.existUsername(data.userName)) {
                    let request = new Request('http://localhost:3000/api/user-info/post', {
                        method: 'POST',
                        headers: new Headers({ 'Content-Type': 'application/json' }),
                        body: JSON.stringify(data)
                    });

                    fetch(request)
                        .then(function(response) {
                            response.json().then(function(data) {
                                console.log(data)
                            })
                    });
                    this.registerSucceedChild.current.handleOpen();
                } else {
                    let erroInfo = '';
                    if (data.userName === '') {
                        erroInfo = 'Username cannot be empty!';
                    }
                    else if (this.existUsername(data.userName)) {
                        erroInfo = 'The username is registered by the other person!';
                    }
                    else if (data.password !== data.reenterPassword) {
                        erroInfo = 'The password and the reentered Password are different!';
                    }
                    this.setState({ newUserData: {
                        userName: data.userName,
                        password: data.password,
                        reenterPassword: reenterPassword,
                        erroInfo: erroInfo
                    }});
                    this.invalidNewUserErrorChild.current.handleOpen();
                    this.setState({ newUserData: {
                        userName: '',
                        password: '',
                        reenterPassword: '',
                        erroInfo: this.state.newUserData.erroInfo
                    }});
                }
            })
            .catch(err => console.log(err))
    }

    existUsername(username) {
        let exist = false;
        for (let itemInd in this.state.items) {
            let each = this.state.items[itemInd];
            if (each.userName === username) {
                exist = true;
            }
        }
        return exist;
    }

    addNewAccount(event) {
        event.preventDefault();
        this.checkUserInfoAndAdd();
    }

    render() {
        return (
            <div className="newUser">
                <Helmet>
                    <style>{'body { background-color: #eeeeee; }'}</style>
                </Helmet>
                <br />
                <InvalidNewUserView ref={this.invalidNewUserErrorChild} errInfo={this.state.newUserData.erroInfo}/>
                <RegisterSucceedView ref={this.registerSucceedChild}/>
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
                        type='password'
                        margin="dense"
                        className="registerText"
                        value={this.state.newUserData.password}
                        onChange={this.handleEventChange('password')}
                        InputLabelProps={{ shrink: true }}
                    />
                    <br />
                    <TextField
                        required
                        label="Reentered Password"
                        type='password'
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
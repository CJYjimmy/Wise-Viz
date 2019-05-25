import React from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import './component_style/Register.css';
import { navigate } from 'react-mini-router';
import InvalidNewUserView from './InvalidNewUserError';
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
            userData: {
                userName: '',
                password: '',
                erroInfo: ''
            },
            items: [],
        };
        this.login = this.login.bind(this);
        this.existUsernameAndPasswordCorrect = this.existUsernameAndPasswordCorrect.bind(this);
        this.invalidNewUserErrorChild = React.createRef();
    }

    handleEventChange = field => event => {
        const oldData = this.state.userData;
        oldData[field] = event.target.value;
        this.setState({
            newUserData: oldData,
        });
    }

    componentDidMount() {
    }

    checkUserInfoAndLogin() {
        let data = {
            userName: this.state.userData.userName
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
                    userName: this.state.userData.userName,
                    password: this.state.userData.password
                };
                if (this.existUsernameAndPasswordCorrect(data.userName, data.password)) {
                    console.log("login");
                } else {
                    let erroInfo = '';
                    if (data.userName === '') {
                        erroInfo = 'Username cannot be empty!';
                    }
                    else {
                        erroInfo = 'The username is not exist or the password is incorrect!';
                    }
                    this.setState({ userData: {
                        userName: data.userName,
                        password: data.password,
                        erroInfo: erroInfo
                    }});
                    this.invalidNewUserErrorChild.current.handleOpen();
                    this.setState({ userData: {
                        userName: '',
                        password: '',
                        erroInfo: this.state.userData.erroInfo
                    }});
                }
            })
            .catch(err => console.log(err))
    }

    existUsernameAndPasswordCorrect(username, password) {
        let exist = false;
        for (let itemInd in this.state.items) {
            let each = this.state.items[itemInd];
            if (each.userName === username && each.password === password) {
                exist = true;
            }
        }
        return exist;
    }

    login(event) {
        event.preventDefault();
        this.checkUserInfoAndLogin();
    }

    render() {
        return (
            <div className="newUser">
                <Helmet>
                    <style>{'body { background-color: #eeeeee; }'}</style>
                </Helmet>
                <InvalidNewUserView ref={this.invalidNewUserErrorChild} errInfo={this.state.userData.erroInfo}/>
                <br />
                <Typography variant="h4" align="center" gutterBottom>Sign in</Typography>
                <form className="eventForm" onSubmit={this.login}>
                    <TextField
                        required
                        label="User Name"
                        margin="dense"
                        className="registerText"
                        value={this.state.userData.userName}
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
                        value={this.state.userData.password}
                        onChange={this.handleEventChange('password')}
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
                        Login
                    </Button>
                </form>
            </div>
        );
    }

}
import React from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import './component_style/Register.css';
import { navigate } from 'react-mini-router';
import img from './resources/profile_pictures/default_profile_picture.png';

/**
 *
 *
 */
export default class User extends React.Component {
    ChangeView(page) {
        navigate(page);
    }

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                username: '',
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
            item: [],
            usernameUnique: true,
            passwordError: false,
            newPasswordError: false,
            confirmPasswordError: false,
            oldPasswordRequire: false,
            errorInfo: 'The username is registered by the other person!',
        };
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.existUsername = this.existUsername.bind(this);
    }

    componentDidMount() {
    }

    handleEventChange = field => event => {
        const oldData = this.state.userData;
        oldData[field] = event.target.value;
        let passwordError = this.state.passwordError;
        let oldPassword = oldData.oldPassword;
        this.setState({
            userData: oldData,
            error: false,
            oldPasswordRequire: false,
            usernameUnique: true,
            passwordError: false,
            confirmPasswordError: (this.state.userData.newPassword === this.state.userData.confirmPassword ?
                false : this.state.confirmPasswordError),
            newPasswordError: (this.state.userData.newPassword !== '' || this.state.userData.oldPassword === ''
                ? false : this.state.newPasswordError),
        });
    }

    updateUserInfo() {
        if (this.state.userData.oldPassword !== this.props.user.password && this.state.userData.oldPassword !== '') {
            this.setState({ passwordError:true });
        }
        else if (this.state.userData.oldPassword === '' && this.state.userData.newPassword !== '') {
            this.setState({ oldPasswordRequire:true });
        }
        else if (this.state.userData.oldPassword !== '' && this.state.userData.newPassword === '') {
            this.setState({ newPasswordError:true });
        }
        else if (this.state.userData.newPassword !== this.state.userData.confirmPassword){
            this.setState({ confirmPasswordError: true });
        }
        else if (!this.state.passwordError && !this.state.oldPasswordRequire
            && !this.state.newPasswordError && !this.state.confirmPasswordError) {
            let data = {
                userName: this.state.userData.username,
            };
            let request = new Request('http://localhost:3000/api/user-info/check-username-email-unique', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(data)
            });
            fetch(request)
                .then(response => response.json())
                .then(item => this.setState({item}))
                .then(() => {
                    let data = {
                        email: this.props.user.email,
                        userName: this.state.userData.username === '' ? this.props.user.username : this.state.userData.username,
                        password: this.state.userData.newPassword === '' ? this.props.user.password : this.state.userData.newPassword,
                    };
                    if (!this.existUsername(data.userName)) {
                        let request = new Request('http://localhost:3000/api/user-info/update-user-info', {
                            method: 'PUT',
                            headers: new Headers({ 'Content-Type': 'application/json' }),
                            body: JSON.stringify(data)
                        });

                        fetch(request)
                        .then(response => response.json());
                        this.props.onSuccess(data.email, data.userName, data.password);
                        this.ChangeView('/');
                    } else {
                        this.setState({ usernameUnique:false });
                    }
                })
                .catch(err => console.log(err));
        }
    }

    existUsername(username) {
        let exist = false;
        for (let itemInd in this.state.item) {
            let each = this.state.item[itemInd];
            if (each.userName === username && each.email !== this.props.user.email) {
                exist = true;
            }
        }
        return exist;
    }

    render() {
        return (
            <div className="content">
                <fieldset className="fieldset">
                    <form>
                        <div className="postContentLayout">
                            <img className="roundedCircleArticleImg" alt="user"
                                src={img}>
                            </img>
                            <div className="postProfile">
                                <h2>{this.props.user.email}</h2>
                            </div>
                        </div>
                        <h2>User Info</h2>
                        <hr className="hr" width="100%" color="#7986cb" size={3} />
                        <h2>Username (update username by typing new name below) :</h2>
                        <TextField
                            error={!this.state.usernameUnique}
                            label={this.state.userData.username === ''
                                ? this.props.user.username : (this.state.usernameUnique ? "new username" : this.state.errorInfo)}
                            value={this.state.userData.username}
                            className="postTitleText"
                            onChange={this.handleEventChange('username')}
                        />
                        <br />
                        <h2>Change Password:</h2>
                        <TextField
                            error={this.state.passwordError  || this.state.oldPasswordRequire}
                            label={this.state.passwordError ? "Old password is incorrect!" : "Old Password"}
                            value={this.state.userData.oldPassword}
                            className="postTitleText"
                            onChange={this.handleEventChange('oldPassword')}
                        />
                        <br />
                        <TextField
                            error={this.state.newPasswordError}
                            label={this.state.newPasswordError ? "Require new password" : "New Password"}
                            value={this.state.userData.Password}
                            className="postTitleText"
                            onChange={this.handleEventChange('newPassword')}
                        />
                        <br />
                        <TextField
                            error={this.state.confirmPasswordError}
                            label={this.state.confirmPasswordError ? "New password and confirm password are different!" : "Confirm Password"}
                            value={this.state.userData.confirmPassword}
                            className="postTitleText"
                            onChange={this.handleEventChange('confirmPassword')}
                        />
                        <br />
                        <br/><br/>
                        <Button variant="contained" color="secondary" className="postButtons" type="button" onClick={() => this.ChangeView('/')}>Cancel</Button>
                        <Button variant="contained" color="primary" className="postButtons" onClick={() => this.updateUserInfo()}>Update</Button>
                    </form>
                </fieldset>
            </div>
        );
    }

}
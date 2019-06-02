import React, { Component } from 'react';
import NavBar from './components/NavBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/Theme';
import RoutedApp from './routing/routing';
import './App.css';

/**
 * 'App' serves as a colleciton point of lower components before they
 * are sent off to rendering in index.js
 * This gives us a place to inject routing and theming as well as place
 * components that stay constant throughout the experience, such as the
 * NavBar
*/
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            user: ''
        };
    }

    componentDidMount() {
        const user = sessionStorage.getItem('email') ? {
            email: sessionStorage.getItem('email')
        } : null;
        this.setState({
            loggedIn: user ? true : false,
            user
        });
    }

    onSuccess(userEmail) {
        this.setState({
            loggedIn: true,
            user: {
                email: userEmail
            }
        });
        sessionStorage.setItem('email', userEmail);
    }

    logout() {
        this.setState({
            loggedIn: false,
            user: null
        });
        sessionStorage.removeItem('email');
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <NavBar />
                    <RoutedApp
                        loggedIn={this.loggedIn}
                        onSuccess={this.onSuccess.bind(this)}
                        logout={this.logout.bind(this)}
                        user={this.state.user}
                        history={true}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}



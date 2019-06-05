import React from 'react';
import createReactClass from 'create-react-class';
import MainPage from '../components/MainPage';
import Register from '../components/Register';
import Login from '../components/Login';
import User from '../components/User';

var RouterMixin = require('react-mini-router').RouterMixin;

/**
 * RoutedApp handles routing between each of the main views as well
 * as error handling when a non-existant page is queried
 */
var RoutedApp = createReactClass({

    getInitialState() {
        return { loggedIn: this.props.loggedIn};
    },

    mixins: [RouterMixin],

    routes: {
        '/': 'home',
        '/register': 'register',
        '/login': 'login',
        '/user': 'user',
    },

    render() {
        return this.renderCurrentRoute();
    },

    home() {
        return (
            <MainPage
                loggedIn={this.props.loggedIn}
                onSuccess={this.props.onSuccess}
                logout={this.props.logout}
                user={this.props.user}
                updateClickedUsername={this.props.updateClickedUsername}
                clickedUsername={this.props.clickedUsername}
            />
        );
    },

    register() {
        return (
            <Register/>
        );
    },

    login() {
        return (
            <Login
                loggedIn={this.props.loggedIn}
                onSuccess={this.props.onSuccess}
                user={this.props.user}
            />
        );
    },

    user() {
        return (
            <User
                logout={this.props.logout}
                user={this.props.user}
            />
        );
    },

    notFound(path) {
        return <div className="not-found">Page Not Found: {path}</div>;
    }
});

export default RoutedApp;
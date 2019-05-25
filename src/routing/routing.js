import React from 'react';
import createReactClass from 'create-react-class';
import MainPage from '../components/MainPage';
import Register from '../components/Register';
import Login from '../components/Login';

var RouterMixin = require('react-mini-router').RouterMixin;

/**
 * RoutedApp handles routing between each of the main views as well
 * as error handling when a non-existant page is queried
 */
var RoutedApp = createReactClass({

    mixins: [RouterMixin],

    // TODO: Set up /vote/:text (voteWithID) to handle url-injected event IDs
    //      (currently displays the same as /vote)
    routes: {
        '/': 'home',
        '/register': 'register',
        '/login': 'login'
    },

    render() {
        return this.renderCurrentRoute();
    },

    home() {
        return (
            <MainPage/>
        );
    },

    register() {
        return (
            <Register/>
        );
    },

    login() {
        return (
            <Login/>
        );
    }
});

export default RoutedApp;
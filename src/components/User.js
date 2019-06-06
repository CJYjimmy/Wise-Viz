import React from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import './component_style/Register.css';
import { navigate } from 'react-mini-router';

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
        this.state = {};
    }

    render() {
        return (
            <div className="newUser">
                <p>Here</p>
            </div>
        );
    }

}
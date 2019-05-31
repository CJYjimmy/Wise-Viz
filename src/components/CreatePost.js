import React from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import { navigate } from 'react-mini-router';
import {Helmet} from 'react-helmet';

/**
 *
 *
 */
export default class CreatePost extends React.Component {
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
                <Helmet>
                    <style>{'body { background-color: #eeeeee; }'}</style>
                </Helmet>

            </div>
        );
    }

}
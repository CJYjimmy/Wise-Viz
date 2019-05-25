import React from 'react';
import { Typography, Button, ListItem, Grid } from '@material-ui/core';
import './component_style/MainPage.css';
import { navigate } from 'react-mini-router';
import HelpView from './Help';
import RegisterView from './Register';
import LoginView from './Login';
import {Helmet} from 'react-helmet';

/**
 * Main View, just contains buttons for navigating to organizer and voting
 * views.
 * TODO: Clean up the button styling a bit
 */
export default class MainPage extends React.Component {
    ChangeView(page) {
        navigate(page);
    }

    constructor(props) {
        super(props);
        this.helpChild = React.createRef();
    }

    render() {
        return (
            <div className="content">
                <Helmet>
                    <style>{'body { background-color: #eeeeee; }'}</style>
                </Helmet>
                <br />
                <HelpView ref={this.helpChild} />
                <Typography variant="h4" align="center" gutterBottom>Welcome to Wise-Viz!</Typography>
                <Grid container justify="center">
                    <div className="buttons">
                        <ListItem>
                            <Button variant="contained" color="primary" className="buttons" onClick={() => this.ChangeView('/login')}>Longin</Button>
                        </ListItem>

                        <ListItem>
                            <Button variant="contained" color="secondary" className="buttons" onClick={() => this.ChangeView('/register')}>New User</Button>
                        </ListItem>
                    </div>
                </Grid>
                <br />
                <p align="center" onClick={() => this.helpChild.current.handleOpen()}>About Wise-Viz</p>
            </div>
        );
    }

}
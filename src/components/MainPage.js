import React from 'react';
import { Typography, Button, ListItem, Grid } from '@material-ui/core';
import {  } from 'react-bootstrap'
import './component_style/MainPage.css';
import { navigate } from 'react-mini-router';
import HelpView from './Help';
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
        this.state = {
            createPost: false,
            showPosts: true,
        }
        this.helpChild = React.createRef();
        this.handleCreatePostOpen =  this.handleCreatePostOpen.bind(this);
        this.handleCreatePostClose = this.handleCreatePostClose.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleCreatePostOpen = () => {
        this.setState({
            createPost: true,
            showPosts: false,
        });
    }

    handleCreatePostClose = () => {
        this.setState({
            createPost: false,
            showPosts: true,
        });
    }

    logout = () => {
        this.props.logout();
        this.handleCreatePostClose();
    }

    render() {
        return (
            <div className="content">
                <Helmet>
                    <style>{'body { background-color: #eeeeee; }'}</style>
                </Helmet>
                <br />
                <HelpView ref={this.helpChild} />
                <Grid container justify="center" spacing={24}>
                    <Grid item xs={7} sm={7}>
                        {
                            this.state.createPost === true && (
                                <form className="grid" method="post" action="">
                                    <fieldset className="fieldset">
                                        <legend>
                                            New Post
                                        </legend>
                                        <h2>Post Title</h2>
                                    </fieldset>
                                </form>
                            )
                        }
                        {
                            this.state.showPosts === true && (
                                <Grid container justify="center">
                                </Grid>
                            )
                        }
                    </Grid>

                    <Grid item sm={3}>
                        <fieldset className="fieldset">
                            <Typography variant="h5" align="center" gutterBottom>Welcome to Wise-Vizs!</Typography>
                            {
                                this.props.user == null && (
                                    <Grid container justify="center">
                                        <div className="buttons">
                                            <ListItem>
                                                <Button variant="contained" color="primary" className="buttons" onClick={() => this.ChangeView('/login')}>Log in</Button>
                                            </ListItem>

                                            <ListItem>
                                                <Button variant="contained" color="secondary" className="buttons" onClick={() => this.ChangeView('/register')}>Sign Up</Button>
                                            </ListItem>
                                        </div>
                                    </Grid>
                                )
                            }
                            {
                                this.props.user != null && (
                                    <Grid container justify="center">
                                        <div>
                                            <ListItem>
                                                <Button variant="contained" color="primary" className="buttons" onClick={() => this.ChangeView('/login')}>Create Community</Button>
                                            </ListItem>

                                            <ListItem>
                                                <Button variant="contained" color="primary" className="buttons" onClick={() => this.handleCreatePostOpen()}>Create Post</Button>
                                            </ListItem>

                                            <ListItem>
                                                <Button variant="contained" color="secondary" className="buttons" onClick={() => this.logout()}>Logout</Button>
                                            </ListItem>
                                        </div>
                                    </Grid>
                                )
                            }
                            <p align="center" onClick={() => this.helpChild.current.handleOpen()}>About Wise-Viz</p>
                        </fieldset>
                    </Grid>
                </Grid>
            </div>
        );
    }

}
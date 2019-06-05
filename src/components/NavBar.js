import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import OrganizerIcon from '@material-ui/icons/AssignmentInd';
import VoteIcon from '@material-ui/icons/HowToVote';
import { navigate } from 'react-mini-router';
import { Drawer, ListItemIcon, Button, ListItemText, ListItem, Divider } from '@material-ui/core';

import './component_style/NavBar.css';
import logoSvg from '../logo.svg';
import HelpView from './Help';

/**
 * The NavBar contains the top AppBar as well as the navigation Drawer on
 * the left side, activated by the hamburger menu icon
 */
export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.helpChild = React.createRef();
    }

    ChangeView(page) {
        navigate(page);
    }

    toggleDrawer = () => this.setState({ open: !this.state.open });
    closeDrawer = () => this.setState({open: false});

    render() {

        return (
            <div className="root">
                <AppBar position="static" >
                    <Toolbar>
                        <IconButton className="menuButton" color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <img src={logoSvg} className="navTitle" alt="talli" />
                        <Button color="inherit" onClick={() => {
                            this.props.updateClickedUsername('');
                        }}>Home</Button>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.open} onClose={this.closeDrawer}>
                    <div tabIndex={0} role="button" onClick={this.closeDrawer}>
                        <div width="250">
                            <ListItem button key='Home' onClick={() => this.ChangeView('/')} >
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary='Home' />
                            </ListItem>
                            <ListItem button key='Vote' >
                                <ListItemIcon><VoteIcon /></ListItemIcon>
                                <ListItemText primary='Vote' />
                            </ListItem>
                            <Divider />
                            <ListItem button key='Help' onClick={() => this.helpChild.current.handleOpen()}>
                                <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
                                <ListItemText primary='Help' />
                            </ListItem>
                        </div>
                    </div>
                </Drawer>
                <HelpView ref={this.helpChild} />
            </div>
        );
    }
}

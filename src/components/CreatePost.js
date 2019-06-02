import React from 'react';
import { Button, TextField } from '@material-ui/core';
import './component_style/MainPage.css';
import PostSucceedView from './PostSucceed';

/**
 *
 *
 */
export default class CreatePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postTitle: '',
            postContent: '',
            username: '',
        }
        this.checkPostAndPost = this.checkPostAndPost.bind(this);
        this.postSucceedChild = React.createRef();
        this.getUsername = this.getUsername.bind(this);
    }

    handleEventChange = field => event => {
        const oldData = this.state;
        oldData[field] = event.target.value;
        this.setState({
            newUserData: oldData,
        });
    }

    getUsername() {
        let data = { email: this.props.email};
        let request = new Request('http://localhost:3000/api/user-info/get-username', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });

        fetch(request)
            .then(response => response.json())
            .then(item => {
                this.setState({ username:item[0].userName })
            });
    }

    componentDidMount() {
        this.getUsername();
    }

    checkPostAndPost() {
        let date = new Date();
        let data = {
            postID: Math.random().toString(36).substr(2, 9),
            title: this.state.postTitle,
            content: this.state.postContent,
            postTime: date.toISOString().slice(0, 19).replace('T', ' '),
            email: this.props.email,
            username: this.state.username,
        };
        let request = new Request('http://localhost:3000/api/post-info/post', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });

        fetch(request)
            .then(function(response) {
                response.json().then(function(data) {
                    console.log(data)
                })
        });
        this.postSucceedChild.current.handleOpen();
    }

    render() {
        return (
            <div className="content">
                <PostSucceedView ref={this.postSucceedChild} handleCreatePostClose={this.props.handleCreatePostClose}/>
                <form className="grid" method="post" action="">
                    <fieldset className="fieldset">
                        <legend>
                            New Post
                        </legend>
                        <h2>Post Title:</h2>
                        <TextField
                            required
                            label="Post Title"
                            variant="outlined"
                            value={this.state.postTitle}
                            className="postTitleText"
                            onChange={this.handleEventChange('postTitle')}
                        />
                        <br />
                        <h2>Content:</h2>
                        <textarea
                            name="message"
                            className="textarea"
                            rows="10"
                            cols="30"
                            wrap="soft"
                            value={this.state.postContent}
                            onChange={this.handleEventChange('postContent')}
                        >
                        </textarea>
                        <br/><br/>
                        <Button variant="contained" color="secondary" className="postButtons" onClick={() => this.props.handleCreatePostClose()}>Cancel</Button>
                        <Button variant="contained" color="primary" className="postButtons" onClick={() => this.checkPostAndPost()}>Post</Button>
                    </fieldset>
                </form>
            </div>
        );
    }

}
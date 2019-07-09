import React from 'react';
import { Button } from 'react-bootstrap';
import './component_style/PostContent.css';
import img from './resources/profile_pictures/default_profile_picture.png';
import Comments from './Comments';
import Comment from './Comment';

export default class PostContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.clickedPost,
            commentState: false,
            commentsState: true,
        }
        this.reverseState = this.reverseState.bind(this)
    }

    componentDidMount() {
    }

    reverseState() {
        this.setState({
            commentState: !this.state.commentState,
            commentsState: !this.state.commentsState,
        });
    }

    render() {
        return (
            <div className="content">
                <br />
                <h2 className="title" align="center">{this.state.post.title}</h2>
                <p className="nameAndTime">{this.state.post.username} | {this.state.post.postTime}</p>
                <br />
                <form className="postContentForm">
                    <p className="detail">{this.state.post.content}</p>
                </form>
                <br /> <br />
                { this.state.commentState && (
                    <Comment clickedPost={this.props.clickedPost} user={this.props.user} reverseState={() => this.reverseState()} />
                )}
                { this.state.commentsState && (
                    <Comments clickedPost={this.props.clickedPost} user={this.props.user} reverseState={() => this.reverseState()} />
                )}
            </div>
        );
    }

}
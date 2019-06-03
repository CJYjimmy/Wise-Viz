import React from 'react';
import { } from '@material-ui/core';
import './component_style/MainPage.css';
import img from './resources/profile_pictures/default_profile_picture.png';

export default class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.getPosts = this.getPosts.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {

        fetch(new Request('http://localhost:3000/api/post-info/get'))
            .then(response => response.json())
            .then(items => this.setState({ posts:items }));
    }

    render() {
        return (
            <list className="grid" method="post" action="">
                {this.state.posts.map((post, index) => (
                    <article className="postArticle" key={index}>
                        <fieldset className="postFieldset">
                            <div className="userInfoDiv">
                                <img className="roundedCircleArticleImg"
                                    src={img}>
                                </img>
                                <div className="postContentLayout">
                                    <p className="userInfoP">{post.username} | {post.postTime}</p>
                                    <hr className="hr" width="100%" color="#7986cb" size={3} />
                                    <h2 className="postTitle">{post.title}</h2>
                                    <p className="postContent">{post.content}</p>
                                </div>
                            </div>
                        </fieldset>
                        <br/>
                    </article>
                ))}
            </list>
        );
    }

}
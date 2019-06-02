import React from 'react';
import { Button, TextField, ListItem } from '@material-ui/core';
import './component_style/MainPage.css';

export default class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.getPosts = this.getPosts.bind(this);
    }

    getPosts() {

        fetch(new Request('http://localhost:3000/api/post-info/get'))
            .then(response => response.json())
            .then(items => this.setState({ posts:items }));
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        return (
            <div className="content">
                <div>
                    <ListItem>
                        <form className="grid" method="post" action="">
                            {this.state.posts.map((post, index) => (
                                <div key={index}>
                                    <fieldset className="fieldset">
                                        <h2>{post.title}</h2>
                                        <p>{post.username} | {post.postTime}</p>

                                    </fieldset>
                                    <br/>
                                </div>
                            ))}
                        </form>
                    </ListItem>
                </div>
            </div>
        );
    }

}
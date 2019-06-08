import React from 'react';
import { Button } from 'react-bootstrap';
import './component_style/MainPage.css';
import img from './resources/profile_pictures/default_profile_picture.png';

export default class PostContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: [],
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {

        let data = { username:this.props.clickedUsername };
        let request = '';

        if (this.props.clickedUsername === '') {
            request = new Request('http://localhost:3000/api/post-info/get')

        } else {
            request = new Request('http://localhost:3000/api/post-info/get-click-user-post', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(data)
            });
        }
        fetch(request)
                .then(response => response.json())
                .then(items => this.setState({ posts:items }))
                .then(() => {
                    let numOfPosts = this.state.posts.length;
                    let numOfPages = Math.ceil(numOfPosts / 3);
                    if (numOfPages === 0) {
                        numOfPages = 1;
                    }
                    let currentShownPosts = [];
                    for (let i = 3 * (this.state.currentPage - 1); i < 3 * this.state.currentPage && i < numOfPosts; i++) {
                        let post = this.state.posts[i];
                        currentShownPosts[i] = post;
                    }
                    this.setState({
                        numOfPosts: numOfPosts,
                        numOfPages: numOfPages,
                        currentShownPosts: currentShownPosts,
                    });
                    this.getPageButtons();
                });
    }

    updataPosts(b) {
        let currentShownPosts = [];
        for (let i = 3 * (b - 1); i < 3 * b && i < this.state.numOfPosts; i++) {
            let post = this.state.posts[i];
            currentShownPosts[i] = post;
        }
        this.setState({
            currentShownPosts: currentShownPosts,
        });
        this.getPageButtons(b);
    }

    updateCurrentPosts(b) {
        this.setState({ currentPage:b });
        this.updataPosts(b);
    }

    getPageButtons(b) {
        if (b == null) {
            b = 1;
        }
        let totalPages = this.state.numOfPages;
        let currentPage = b;
        let buttons = [];
        buttons[0] = 1;
        let index = 1;
        for (let i = currentPage - 2 > 1 ? currentPage - 2 : 2 ; i <= currentPage + 2 && i <= totalPages; i++) {
            if (buttons[index - 1] + 1 !== i) {
                buttons[index] = '...';
                index++;
            }
            buttons[index] = i;
            index++;
        }
        if (buttons[index - 1] !== totalPages) {
            if (buttons[index - 1] !== totalPages - 1) {
                buttons[index] = '...';
                buttons[index + 1] = totalPages;
            } else {
                buttons[index] = totalPages;
            }
        }
        this.setState({ buttons:buttons });
    }

    render() {
        return (
            <div></div>
        );
    }

}
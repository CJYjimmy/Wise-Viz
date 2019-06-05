import React from 'react';
import { Button } from 'react-bootstrap';
import './component_style/MainPage.css';
import img from './resources/profile_pictures/default_profile_picture.png';
import { navigate } from 'react-mini-router';

export default class Post extends React.Component {

    ChangeView(page) {
        navigate(page);
    }

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            numOfPosts: 0,
            currentPage: 1,
            numOfPages: 0,
            currentShownPosts: [],
            buttons: [],
        }
        this.getPosts = this.getPosts.bind(this);
        this.getPageButtons = this.getPageButtons.bind(this);
        this.updateCurrentPosts = this.updateCurrentPosts.bind(this);
        this.updataPosts = this.updataPosts.bind(this);
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
            <form className="grid" method="post" action="">
                {this.state.currentShownPosts.map((post, index) => (
                    <article className="postArticle" key={index}>
                        <fieldset className="postFieldset">
                            <div className="userInfoDiv">
                                <img className="roundedCircleArticleImg" alt="user"
                                    src={img}>
                                </img>
                                <div className="postContentLayout">
                                    <div className="postProfile">
                                        <a className="userInfoPUsername" href="/" onClick={() => {
                                                this.props.updateClickedUsername(post.username)
                                            }}>{post.username}</a>
                                        <p className="userInfoP">| {post.postTime}</p>
                                    </div>
                                    <hr className="hr" width="100%" color="#7986cb" size={3} />
                                    <h2 className="h2ForPostTitle"><a className="postTitle" href="/" onClick={() => console.log('click')}>{post.title}</a></h2>
                                    <p className="postContent">{post.content}</p>
                                </div>
                            </div>
                        </fieldset>
                        <br/>
                    </article>
                ))}
                <div className="pageButtons">
                    {this.state.buttons.map((b, index) => {
                        if (b === this.state.currentPage) {
                            return (<Button className="currentPageButton" key={index} num={b} variant="contained" onClick={() => this.updateCurrentPosts(b)}>{b}</Button>)
                        } else {
                            return (<Button className="pageButton" key={index} num={b} variant="contained" onClick={() => this.updateCurrentPosts(b)}>{b}</Button>)
                        }
                    })}
                </div>
            </form>
        );
    }

}
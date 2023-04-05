import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css'
import { v4 as uuid } from 'uuid';
import Joke from './Joke';

const API_URL = 'https://icanhazdadjoke.com'

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = { jokes: JSON.parse(localStorage.getItem('jokes') || '[]'), isLoading: false };
        this.state.jokes.sort((a, b) => b.votes - a.votes);
        this.existingJokes = new Set(this.state.jokes.map(joke => joke.jokeText));
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        if (!localStorage.getItem('jokes')) {
            this.getJokes()
        }
    }

    handleClick() {
        this.setState({ isLoading: true }, this.getJokes)
    }

    async getJokes() {
        try {
            let jokes = [];
            while (jokes.length < this.props.numJokesToGet) {
                let res = await axios.get(API_URL, { headers: { Accept: "application/json" } });
                let newJoke = res.data.joke;
                if (!this.existingJokes.has(newJoke)) {
                    jokes.push({ jokeText: newJoke, id: uuid(), votes: 0 });
                } else {
                    console.log('DUPLICATE FOUND!');
                    console.log(newJoke);
                }
            }
            this.setState(
                currentState => ({
                    jokes: [...currentState.jokes, ...jokes].sort((a, b) => b.votes - a.votes),
                    isLoading: false
                }),
                () => localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
            );
            this.state.jokes.sort((a, b) => b.votes - a.votes);
        } catch (e) {
            console.log(e);
        }
    }



    handleVote(id, vote) {
        this.setState(
            prevState => ({
                jokes: prevState.jokes.map(
                    joke => joke.id === id ? { ...joke, votes: joke.votes + vote } : joke
                )
            }), () => localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className='JokeList-spinner'>
                    <i className='far fa-8x fa-laugh fa-spin'></i>
                    <h1 className='JokeList-title'>Loading...</h1>
                </div>
            )
        }
        return (
            <div className='JokeList'>
                <div className='JokeList-sidebar'>
                    <h1 className='JokeList-title'><span>Jokes</span> list</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className='JokeList-getmore' onClick={this.handleClick} >New Jokes</button>
                </div>
                <div className='JokeList-jokes'>
                    {this.state.jokes.map(joke =>
                        <Joke key={joke.id}
                            id={joke.id}
                            jokeText={joke.jokeText}
                            votes={joke.votes}
                            voteHandler={this.handleVote} />)}
                </div>
            </div>
        )
    }
}

export default JokeList;
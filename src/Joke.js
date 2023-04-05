import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
    constructor(props) {
        super(props);
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }
    upvote() {
        this.props.voteHandler(this.props.id, 1)
    }
    downvote() {
        this.props.voteHandler(this.props.id, -1)
    }
    getColor() {
        let { votes } = this.props;
        if (votes >= 15) {
            return '#4CAF50';
        } else if (votes >= 12) {
            return '#8BC34A';
        } else if (votes >= 9) {
            return '#CDDC39';
        } else if (votes >= 6) {
            return '#FFEB3B';
        } else if (votes >= 3) {
            return '#FFC107';
        } else if (votes >= 0) {
            return '#FF9800';
        } else {
            return '#F44336';
        }
    }
    getEmoji() {
        let { votes } = this.props;
        if (votes >= 15) {
            return 'em em-rolling_on_the_floor_laughing';
        } else if (votes >= 12) {
            return 'em em-laughing';
        } else if (votes >= 9) {
            return 'em em-smiley';
        } else if (votes >= 6) {
            return 'em em-slightly_smiling_face';
        } else if (votes >= 3) {
            return 'em em-neutral_face';
        } else if (votes >= 0) {
            return 'em em-confused';
        } else {
            return 'em em-angry';
        }
    }

    render() {
        return (
            <div className='Joke'>
                <div className='Joke-buttons'>
                    <i className='fas fa-arrow-up' onClick={this.upvote}></i>
                    <span className='Joke-votes' style={{ borderColor: this.getColor() }}>{this.props.votes}</span>
                    <i className='fas fa-arrow-down' onClick={this.downvote}></i>
                </div>
                <div className='Joke-text'>
                    {this.props.jokeText}
                </div>
                <div className='Joke-emoji'>
                    <i className={this.getEmoji()} aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
                </div>
            </div>
        )
    }
}

export default Joke;
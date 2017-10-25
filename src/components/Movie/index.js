import React, { Component } from 'react';

export default class Movie extends Component {
    render () {
        const { posterPath } = this.props;
        return <img src={ posterPath } />
    }
}
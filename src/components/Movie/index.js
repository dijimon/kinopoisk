import React, { Component } from 'react';
import Styles from './styles.scss';

export default class Movie extends Component {
    render () {
        const { posterPath, movie } = this.props;


        return (
            <section className = { Styles.movieItem }>
                <img src = { posterPath } />
                <span className = { Styles.title }>{ movie.title }</span>
                <span className = { Styles.year }>{`Год выпуска: ${movie.release_date.substring(0, 4)}`}</span>
            </section>

        );
    }
}

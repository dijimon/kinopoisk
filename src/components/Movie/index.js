import React, { Component } from 'react';
import Styles from './styles.scss';

export default class Movie extends Component {
    render () {
        const { posterPath, movie, genres } = this.props;
        const genreNamesArr = movie.genre_ids.map((g) => genres[g] );
        const genreNames = genreNamesArr.join(', ');

        return (
            <section className = { Styles.movieItem }>
                <img src = { posterPath } />
                <span className = { Styles.title }>{ movie.title }</span>
                <span className = { Styles.year }>{`Год: ${movie.release_date.substring(0, 4)}`}</span>
                <span className = { Styles.year }>{ genreNames }</span>
                <span className = { Styles.detailsLink }>Подробнее</span>
            </section>

        );
    }
}

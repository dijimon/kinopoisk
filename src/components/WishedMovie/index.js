import React, { Component } from 'react';
import Styles from './styles.scss';

export default class WishedMovie extends Component {
    constructor () {
        super();

    }

    render () {
        const { movie, handleMovieClick, genres, index, removeFromWishlist, remove } = this.props;
        const genreNamesArr = movie.genre_ids.map((g) => genres[g]);
        const genreNames = genreNamesArr.join(', ');

        return (
            <section className = { Styles.movieItem }>
                <span className = { Styles.close } onClick = { () => remove(movie.id, movie) }>×</span>
                <div className = { Styles.imgCont } onClick = { () => handleMovieClick(movie) }>
                    <img src = { `https://image.tmdb.org/t/p/w130/${movie.poster_path}` } />
                </div>
                <section onClick = { () => this.handleMovieClick(movie) }>
                    <span className = { Styles.title }>{ movie.title }</span>
                </section>
            </section>

        );
    }
}

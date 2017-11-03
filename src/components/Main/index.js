import React, { Component } from 'react';
import Styles from './styles.scss';
import Movie from '../Movie';
import MainTabs from '../MainTabs';

import { PropTypes } from 'prop-types';

export default class Main extends Component {
    static contextTypes = {
        baseUrl:  PropTypes.string.isRequired,
        apiKey:   PropTypes.string.isRequired,
        language: PropTypes.string.isRequired
    }

    constructor () {
        super();

        this.state = {
            movies: [],
            genres: {}
        };

        this.handleMovieClick = this._handleMovieClick.bind(this);
    }

    _handleMovieClick (movie) {
        this.props.showDetailsPopUp(movie);
    }

    render () {
        const { genres, switchFilter, filter, movies, addToWishlist, addToFavoritelist, wishList, favoriteList } = this.props;

        const moviesList = movies.map((movie, index) =>
            (<section key = { index }>
                <Movie
                    posterPath = { `https://image.tmdb.org/t/p/w160/${movie.poster_path}` }
                    movie = { movie }
                    movieId = { index + 1 }
                    wishList = { wishList }
                    favoriteList = { favoriteList }
                    genres = { genres }
                    addToWishlist = { addToWishlist }
                    addToFavoritelist = { addToFavoritelist }
                    handleMovieClick = { this.handleMovieClick }
                />
            </section>

            )
        );


        return (
            <section className = { Styles.extCont }>
                <MainTabs filter = { filter } switchFilter = { switchFilter } />
                <section className = { Styles.mainList }>
                    { moviesList }
                </section>
            </section>

        );
    }
}

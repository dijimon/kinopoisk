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

    constructor (props) {
        super();

        this.state = {
            movies: [],
            genres: {}
        };

        this.handleClick = this._handleClick.bind(this);
    }

    //componentWillReceiveProps (props) {
    //this.getMovies(props.filter);
    //}

    _handleClick (event, movie) {
        this.props.showDetailsPopUp(movie);
    }

    render () {
        const { genres, switchFilter, filter, getMovies } = this.props;

        const movies = this.state.movies.map((movie, index) =>
            (<section onClick = { () => this.handleClick(movie) }>
                <Movie
                    posterPath = { `https://image.tmdb.org/t/p/w160/${movie.poster_path}` }
                    movie = { movie }
                    genres = { genres }
                />
            </section>)
        );


        return (
            <section className = { Styles.extCont }>
                <MainTabs filter = { filter } switchFilter = { switchFilter } />
                <section className = { Styles.mainList }>
                    { movies }
                </section>
            </section>

        );
    }
}

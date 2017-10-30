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

        this.getMovies = this._getMovies.bind(this);
        this.state = {
            movies: [],
            genres: {},
            filter: props.filter
        };
    }

    componentWillReceiveProps (props) {
        this.setState(() => ({
            filter: props.filter
        }));

        this.getMovies();
    }

    _getMovies () {
        const { baseUrl, apiKey, language } = this.context;

        fetch(`${baseUrl}/movie/${this.state.filter}?api_key=${apiKey}&language=${language}&page=1&region=UA`,
            {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then((results) => {
            if (results.status !== 200) {
                throw new Error('Films were not received.');
            }

            return results.json();
        }).then(({ results }) => {
            this.setState(({ popMovies }) => ({
                movies: results
            }));
        });
    }

    _handleClick (event, movie) {
        this.props.showDetailsPopUp(movie);
    }

    render () {
        const { genres, switchFilter } = this.props;
        const { filter } = this.state;

        let movies = this.state.movies.map((movie, index) =>
            (<section onClick = { (event) => this._handleClick(event, movie) }>
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

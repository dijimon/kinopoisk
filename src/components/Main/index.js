import React, { Component } from 'react';
import Styles from './styles.scss';
import Movie from '../Movie';

import { PropTypes } from 'prop-types';

export default class Main extends Component {
    static contextTypes = {
        baseUrl:  PropTypes.string.isRequired,
        apiKey:   PropTypes.string.isRequired,
        language: PropTypes.string.isRequired
    }

    constructor (props) {
        super();

        this.getPopularMovies = this._getPopularMovies.bind(this);
        this.state = {
            popMovies: [],
            genres: {},
            filter: props.filter
        };
    }

    componentWillMount () {

    }

    componentWillReceiveProps (props) {
        this.setState(() => ({
            filter: props.filter
        }));
        this.getPopularMovies();
    }

    _getPopularMovies () {
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
                popMovies: results
            }));
        });
    }

    render () {
        const { genres } = this.props;

        const popMovies = this.state.popMovies.map((movie, index) =>
            (<Movie
                key = { index }
                posterPath = { `https://image.tmdb.org/t/p/w150/${movie.poster_path}` }
                movie = { movie }
                genres = { genres }
                />)
        );


        return (
            <section className = { Styles.extCont }>
                <section className = { Styles.wishList } />
                <section className = { Styles.mainList }>
                    { popMovies }
                </section>
            </section>

        );
    }
}

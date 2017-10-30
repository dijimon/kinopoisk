import React, { Component } from 'react';
import Styles from './styles.scss';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

import { PropTypes } from 'prop-types';
import DetailsPopUp from '../DetailsPopUp/index';

export const config = {
    baseUrl:  'https://api.themoviedb.org/3',
    apiKey:   '9a8d59d5385222ef85c69dd5bc16c15c',
    language: 'ru-RU'
};

export default class Home extends Component {
    static childContextTypes = {
        baseUrl:  PropTypes.string.isRequired,
        apiKey:   PropTypes.string.isRequired,
        language: PropTypes.string.isRequired
    }

    constructor () {
        super();

        this.state = {
            genres:           {},
            filter:           'popular',
            movie:            {},
            showDetailsPopUp: false
        };

        this.getGenreList = this._getGenreList.bind(this);
        this.switchFilter = this._switchFilter.bind(this);
        this.showDetailsPopUp = this._showDetailsPopUp.bind(this);
        this.hideDetailsPopUp = this._hideDetailsPopUp.bind(this);
        this.getMovies = this._getMovies.bind(this);
    }

    componentWillMount () {
        this.getGenreList();
        this.getMovies(this.state.filter);
    }

    getChildContext () {
        return config;
    }

    _getGenreList () {
        fetch(`${config.baseUrl}/genre/movie/list?api_key=${config.apiKey}&language=${config.language}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then((results) => {
            if (results.status !== 200) {
                throw new Error('Can\'t get genres.');
            }

            return results.json();
        }).then((data) => {
            const flatGenres = {};

            data.genres.forEach((genre) => {
                flatGenres[genre.id] = genre.name;
            });

            this.setState(() => ({
                genres: flatGenres
            }));
        }).catch((error) => {
            console.log(error.message);
        });
    }

    _switchFilter (category) {
        this.getMovies(category);
        this.setState({
            filter: category
        });
    }

    _showDetailsPopUp (movie) {
        this.setState((prevState) => ({
            movie,
            showDetailsPopUp: true
        }));
    }

    _hideDetailsPopUp () {
        this.setState((prevState) => ({
            showDetailsPopUp: false
        }));
    }

    _getMovies (filter) {
        const { baseUrl, apiKey, language } = this.context;

        fetch(`${baseUrl}/movie/${filter}?api_key=${apiKey}&language=${language}&page=1&region=UA`,
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
            this.setState(() => ({
                movies: results
            }));

            this.forceUpdate();
        });
    }

    render () {
        const { genres, filter, showDetailsPopUp, movie } = this.state;


        return (
            <section className = { Styles.home }>
                <DetailsPopUp genres = { genres } hidePopUp = { this.hideDetailsPopUp } show = { showDetailsPopUp } movie = { movie } />
                <Header />
                <Main getMovies = { this.getMovies } switchFilter = { this.switchFilter } filter = { filter } genres = { genres } showDetailsPopUp = { this.showDetailsPopUp } />
                <Footer />
            </section>
        );
    }
}

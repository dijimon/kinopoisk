import React, { Component } from 'react';
import Styles from './styles.scss';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

import { PropTypes } from 'prop-types';

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
            genres: {},
            filter: ['popular']
        };

        this.getGenreList = this._getGenreList.bind(this);
        this.switchFilter = this._switchFilter.bind(this);
    }

    componentWillMount () {
        this.getGenreList();
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

            console.log(flatGenres);
            this.setState(() => ({
                genres: flatGenres
            }));
        }).catch((error) => {
            console.log(error.message);
        });
    }

    _switchFilter (selector) {
        console.log(selector);
        this.setState(() => ({
            filter: [selector]
        }));
    }

    render () {
        const { genres, filter } = this.state;
        return (
            <section className = { Styles.home }>
                <Header filter = {filter} switchFilter = { this.switchFilter } />
                <Main filter = {filter[0]} genres = { genres } />
                <Footer />
            </section>
        );
    }
}

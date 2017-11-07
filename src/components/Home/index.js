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
            filter:           'now_playing',
            movie:            {},
            movies:           [],
            page:             1,
            showDetailsPopUp: false,
            wishList:         window.localStorage.wishList ? window.localStorage.wishList.split(',') : [],
            wishMovies:       window.localStorage.wishMovies ? JSON.parse(window.localStorage.wishMovies) : [],
            showWishList:     true,
            favoriteList:     window.localStorage.favoriteList ? window.localStorage.favoriteList.split(',') : [],
            favoriteMovies:   window.localStorage.favoriteMovies ? JSON.parse(window.localStorage.favoriteMovies) : [],
            showFavoriteList: true,
            showSpinner:      false,
            loadMore:         true
        };

        this.getGenreList = this._getGenreList.bind(this);
        this.switchFilter = this._switchFilter.bind(this);
        this.showDetailsPopUp = this._showDetailsPopUp.bind(this);
        this.hideDetailsPopUp = this._hideDetailsPopUp.bind(this);
        this.getMovies = this._getMovies.bind(this);
        this.getMoviesBySearch = this._getMoviesBySearch.bind(this);
        this.addToWishlist = this._addToWishlist.bind(this);
        this.addToFavoritelist = this._addToFavoritelist.bind(this);
        this.removeFromWishlist = this._removeFromWishlist.bind(this);
        this.removeFromFavoritelist = this._removeFromFavoritelist.bind(this);
        this.toggleWishList = this._toggleWishList.bind(this);
        this.toggleFavoriteList = this._toggleFavoriteList.bind(this);
        this.handleScrollDown = this._handleScrollDown.bind(this);
    }

    getChildContext () {
        return config;
    }

    componentWillMount () {
        this.getGenreList();
        this.getMovies(1);
    }

    componentDidMount () {
        window.addEventListener('scroll', this.handleScrollDown);
    }

    async _handleScrollDown () {
        const scrollTop = window.pageYOffset;

        if (this.state.loadMore === true) {
            if (scrollTop + window.innerHeight >= document.body.offsetHeight) {
                await this.setState(() => ({
                    page: this.state.page + 1
                }));
                if (this.state.filter) {
                    this.getMovies(this.state.page);
                }
            }
        }
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

    async _switchFilter (category) {
        await this.setState({
            filter:   category,
            loadMore: true
        });
        this.getMovies(1);
    }

    _showDetailsPopUp (movie) {
        this.setState(() => ({
            movie,
            showDetailsPopUp: true
        }));
    }

    _hideDetailsPopUp () {
        this.setState(() => ({
            showDetailsPopUp: false
        }));
    }

    _getMovies (page) {
        const { baseUrl, apiKey, language } = config;
        const url = `${baseUrl}/movie/${this.state.filter}?api_key=${apiKey}&language=${language}&page=${page}&region=UA`;

        if (this.state.loadMore === true) {

            this.setState(() => ({
                showSpinner: true
            }));

            fetch(url,
                {
                    method:  'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then((results) => {
                if (results.status !== 200) {
                    this.setState(() => ({
                        showSpinner: false,
                        loadMore:    false
                    }));
                    throw new Error('Films were not received.');
                }

                return results.json();
            }).then(({ results }) => {
                if (results.length === 0) {
                    this.setState(() => ({
                        loadMore:    false,
                        showSpinner: false
                    }));
                }

                if (page > 1) {
                    this.setState((prevState) => ({
                        movies: prevState.movies.concat(results)
                    }));
                } else {
                    this.setState(() => ({
                        movies: results
                    }));
                }
            }).catch(() => {
                this.setState(() => ({
                    showSpinner: false,
                    loadMore:    false
                }));
            });
        }
    }

    _getMoviesBySearch (request) {
        const { baseUrl, apiKey, language } = config;
        const url = `${baseUrl}/search/movie?api_key=${apiKey}&language=${language}&page=1&query=${request}`;

        this.setState(() => ({
            showSpinner: true
        }));

        fetch(url,
            {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then((results) => {
            if (results.status !== 200) {
                this.setState(() => ({
                    showSpinner: false,
                    loadMore:    false
                }));
                throw new Error('Films were not received.');
            }

            return results.json();
        }).then(({ results }) => {
            if (results.length === 0) {
                this.setState(() => ({
                    loadMore:    false,
                    showSpinner: false
                }));
            }

            this.setState(() => ({
                movies:      results,
                filter:      '',
                showSpinner: false
            }));
        }).catch(() => {
            this.setState(() => ({
                showSpinner: false,
                loadMore:    false
            }));
        });
    }

    _addToWishlist (event, id, movie) {

        if (event.target.checked) {
            this.setState((prevState) => ({
                wishList:   [...new Set([id, ...prevState.wishList])],
                wishMovies: [...new Set([movie, ...prevState.wishMovies])]
            }));

        } else {
            this.setState((prevState) => ({
                wishList:   prevState.wishList.filter((e) => e !== id),
                wishMovies: prevState.wishMovies.filter((e) => e.id !== id)
            }));
        }
    }

    _addToFavoritelist (event, id, movie) {
        if (event.target.className === '') {
            this.setState((prevState) => ({
                favoriteList:   [...new Set([id, ...prevState.favoriteList])],
                favoriteMovies: [...new Set([movie, ...prevState.favoriteMovies])]
            }));

        } else {
            this.setState((prevState) => ({
                favoriteList:   prevState.favoriteList.filter((e) => e !== id),
                favoriteMovies: prevState.favoriteMovies.filter((e) => e.id !== id)
            }));
        }
    }

    _removeFromWishlist (id) {
        this.setState((prevState) => ({
            wishList:   prevState.wishList.filter((e) => e !== id),
            wishMovies: prevState.wishMovies.filter((e) => e.id !== id)
        }));
    }

    _removeFromFavoritelist (id) {
        this.setState((prevState) => ({
            favoriteList:   prevState.favoriteList.filter((e) => e !== id),
            favoriteMovies: prevState.favoriteMovies.filter((e) => e.id !== id)
        }));
    }

    _toggleWishList () {
        if (this.state.showFavoriteList === false) {
            this.toggleFavoriteList();
        }
        this.setState((prevState) => ({
            showWishList: !prevState.showWishList
        }));
    }

    _toggleFavoriteList () {
        if (this.state.showWishList === false) {
            this.toggleWishList();
        }
        this.setState((prevState) => ({
            showFavoriteList: !prevState.showFavoriteList
        }));
    }

    render () {
        const {
            genres,
            filter,
            showDetailsPopUp,
            movie,
            movies,
            wishList,
            favoriteList,
            wishMovies,
            favoriteMovies,
            showWishList,
            showFavoriteList,
            showSpinner
        } = this.state;

        window.localStorage.setItem('wishList', wishList.join(','));
        window.localStorage.setItem('wishMovies', JSON.stringify(wishMovies));
        window.localStorage.setItem('favoriteList', favoriteList.join(','));
        window.localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

        return (
            <section className = { Styles.home }>
                <Header
                    showWishList = { showWishList }
                    showFavoriteList = { showFavoriteList }
                    wishMovies = { wishMovies }
                    favoriteMovies = { favoriteMovies }
                    toggleWishList = { this.toggleWishList }
                    toggleFavoriteList = { this.toggleFavoriteList }
                    getMoviesBySearch = { this.getMoviesBySearch }
                />
                <Main
                    wishList = { wishList }
                    favoriteList = { favoriteList }
                    addToWishlist = { this.addToWishlist }
                    addToFavoritelist = { this.addToFavoritelist }
                    filter = { filter }
                    genres = { genres }
                    getMovies = { this.getMovies }
                    movies = { movies }
                    switchFilter = { this.switchFilter }
                    showDetailsPopUp = { this.showDetailsPopUp }
                    showSpinner = { showSpinner }
                />
                <Footer
                    toggleWishList = { this.toggleWishList }
                    toggleFavoriteList = { this.toggleFavoriteList }
                    showWishList = { showWishList }
                    showFavoriteList = { showFavoriteList }
                    genres = { genres }
                    wishList = { wishList }
                    wishMovies = { wishMovies }
                    favoriteList = { favoriteList }
                    favoriteMovies = { favoriteMovies }
                    handleMovieClick = { this.showDetailsPopUp }
                    removeFromWishlist = { this.removeFromWishlist }
                    removeFromFavoritelist = { this.removeFromFavoritelist }
                />
                <DetailsPopUp
                    genres = { genres }
                    hidePopUp = { this.hideDetailsPopUp }
                    show = { showDetailsPopUp }
                    movie = { movie }
                />
            </section>
        );
    }
}

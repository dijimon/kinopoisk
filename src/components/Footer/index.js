import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import Styles from './styles.scss';
import WishedMovie from '../WishedMovie/';
import { fromTo } from 'gsap';

export default class Footer extends Component {
    constructor () {
        super();

        this.handlePostmanAppear = this._handlePostmanAppear.bind(this);
        this.handlePostmanDisappear = this._handlePostmanDisappear.bind(this);
        this.togglePostman = this._togglePostman.bind(this);
    }

    _handlePostmanAppear (el) {
        fromTo(el, 1, { y: -300, opacity: 1 }, { y: 0, opacity: 0 });

    }

    _handlePostmanDisappear (el) {
        fromTo(el, 1, { y: 0, opacity: 0 }, { y: -300, opacity: 1 });
    }

    _togglePostman () {
        this.props.toggleWishList();
    }

    render () {
        const { wishMovies, favoriteMovies, handleMovieClick, genres, removeFromWishlist, removeFromFavoritelist, showWishList, showFavoriteList } = this.props;

        let films = '';

        if (!showWishList) {
            if (wishMovies.length === 0) {
                films =
                    <section className = { Styles.textForEmpty }>
                        <h1 className = { Styles.empty }>Вы не выбрали ни одного фильма для просмотра.</h1>
                    </section>;
            } else {
                films = wishMovies.map((movie, index) => (
                    <WishedMovie genres = { genres } index = { index } key = { index } movie = { movie } handleMovieClick = { handleMovieClick } remove = { removeFromWishlist } />
                )
                );
            }
        }

        if (!showFavoriteList) {
            if (favoriteMovies.length === 0) {
                films =
                    <section className = { Styles.textForEmpty }>
                        <h1 className = { Styles.empty }>Вы не выбрали ни одного любимого фильма.</h1>
                    </section>;
            } else {
                films = favoriteMovies.map((movie, index) => (
                    <WishedMovie genres = { genres } index = { index } key = { index } movie = { movie } handleMovieClick = { handleMovieClick } remove = { removeFromFavoritelist } />
                )
                );
            }
        }

        return (
            <Transition
                in = { !showWishList ? showWishList : showFavoriteList }
                timeout = { 100 }
                onEnter = { this.handlePostmanAppear }
                onExit = { this.handlePostmanDisappear }>
                <section className = { Styles.footer }>
                    { films }
                </section>
            </Transition>
        );
    }
}

import React, { Component } from 'react';
import Styles from './styles.scss';

export default class Header extends Component {
    constructor () {
        super();

        this.state = {
            textAreaValue: ''
        };

        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleInputChange = this._handleInputChange.bind(this);
    }

    componentWillReceiveProps () {
        this.forceUpdate();
    }

    _handleSubmit (event) {
        event.preventDefault();

        if (this.state.textAreaValue) {
            this.props.getMoviesBySearch(this.state.textAreaValue);
            this.setState(() => ({
                textAreaValue: ''
            }));
        }
    }

    _handleInputChange (event) {
        const textAreaValue = event.target.value;

        this.setState(() => ({
            textAreaValue
        }));
    }

    render () {
        const { wishMovies, favoriteMovies, toggleWishList, toggleFavoriteList, showWishList, showFavoriteList }   = this.props;
        let wishListCounter;
        let favoriteListCounter;

        if (wishMovies.length > 0) {
            wishListCounter = <span className = { Styles.greenCounter }>{ wishMovies.length }</span>;
        }
        if (favoriteMovies.length > 0) {
            favoriteListCounter = <span className = { Styles.redCounter }>{ favoriteMovies.length }</span>;
        }

        return (
            <section className = { Styles.header }>
                <a className = { showWishList === false ? Styles.active : '' } onClick = { toggleWishList } href = '#'>Смотреть позже { wishListCounter }</a>
                <a className = { showFavoriteList === false ? Styles.active : '' } onClick = { toggleFavoriteList } href = '#'>Любимые { favoriteListCounter }</a>
                <form onSubmit = { this.handleSubmit }>
                    <input
                        placeholder = 'Search for movies...'
                        size = '45'
                        type = 'text'
                        onChange = { this.handleInputChange }
                    />
                    <input
                        type = 'submit'
                    />
                    <span className = { Styles.search } />
                </form>
            </section>
        );
    }
}

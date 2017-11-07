import React, { Component } from 'react';
import Styles from './styles.scss';

// Wait for pause 1sec after character input in search input
let waiter = null;

export default class Header extends Component {
    constructor () {
        super();

        this.state = {

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

        clearTimeout(waiter);

        waiter = setTimeout(() => {
            if (this.state.textAreaValue) {
                this.props.getMoviesBySearch(this.state.textAreaValue);
            }
        }, 2000);
    }

    render () {
        const { wishMovies, favoriteMovies, toggleWishList, toggleFavoriteList, showWishList, showFavoriteList }   = this.props;
        let wishListCounter = '';
        let favoriteListCounter = '';

        if (wishMovies.length > 0) {
            wishListCounter = <span className = { Styles.greenCounter }>{ wishMovies.length }</span>;
        }
        if (favoriteMovies.length > 0) {
            favoriteListCounter = <span className = { Styles.redCounter }>{ favoriteMovies.length }</span>;
        }

        return (
            <section className = { Styles.header }>
                <section>
                    <a className = { showWishList === false ? Styles.active : '' } href = '#' onClick = { toggleWishList }>Смотреть позже { wishListCounter }</a>
                    <a className = { showFavoriteList === false ? Styles.active : '' } href = '#' onClick = { toggleFavoriteList }>Любимые { favoriteListCounter }</a>
                </section>
                <section className = { Styles.logo } />
                <form onSubmit = { this.handleSubmit }>
                    <input
                        placeholder = 'Быстрый поиск...'
                        size = '45'
                        type = 'text'
                        value = { this.state.textAreaValue }
                        onChange = { this.handleInputChange }
                    />
                    <input
                        type = 'submit'
                    />
                </form>
            </section>
        );
    }
}

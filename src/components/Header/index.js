import React, { Component } from 'react';
import Styles from './styles.scss';

// Wait for pause 1sec after character input in search input
let waiter = null;

export default class Header extends Component {
    constructor () {
        super();

        this.state = {
            showSuggestions: false
        };

        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleInputChange = this._handleInputChange.bind(this);
        this.handleSuggestionClick = this._handleSuggestionClick.bind(this);
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
                this.props.getMoviesBySearch(this.state.textAreaValue, true);
                this.setState(() => ({
                    showSuggestions: true
                }));
            }
        }, 1000);
    }

    _handleSuggestionClick (title) {
        if (title) {
            this.props.getMoviesBySearch(title, false);
            this.setState(() => ({
                showSuggestions: false
            }));
        }
    }

    render () {
        const { wishMovies, favoriteMovies, toggleWishList, toggleFavoriteList, showWishList, showFavoriteList, suggestions }   = this.props;
        const { showSuggestions } = this.state;
        let wishListCounter = '';
        let favoriteListCounter = '';

        const suggestionList = suggestions.map((movie, index) => (<li key = { index } onClick = { () => this.handleSuggestionClick(movie.title) }><span>{movie.title}</span></li>));

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
                    {
                        showSuggestions && suggestionList.length > 0 ? <section className = { Styles.suggestions }>
                            <ul>
                                { suggestionList.length > 0 ? suggestionList : <li>Нет результатов</li> }
                            </ul>
                        </section> : ''
                    }
                </form>
            </section>
        );
    }
}

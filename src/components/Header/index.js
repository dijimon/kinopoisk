import React, { Component } from 'react';
import Styles from './styles.scss';

export default class Header extends Component {
    constructor () {
        super();
    }

    render () {
        const { filter } = this.props;

        return (
            <section className = { Styles.header }>
                <a href = '#'>Смотреть позже</a>
                <a href = '#'>Любимые</a>
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

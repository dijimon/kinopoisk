import React, { Component } from 'react';
import Style from './styles.scss';

export default class Header extends Component {
    render () {
        return (
            <section className = { Style.header }>
                <h1>Кинопоиск</h1>
                <a href = '#'>Популярные</a>
            </section>
        );
    }
}

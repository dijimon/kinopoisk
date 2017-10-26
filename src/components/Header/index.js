import React, { Component } from 'react';
import Style from './styles.scss';

export default class Header extends Component {
    constructor () {
        super();
    }

    handleClick (param, event) {
        event.preventDefault();

        this.props.switchFilter(param);
    }

    render () {
        const { filter } = this.props;

        return (
            <section className = { Style.header }>
                <h1>Кинопоиск</h1>
                <a onClick = { this.handleClick.bind(this, 'popular') } href = '#'>Популярные</a>
                <a onClick = { this.handleClick.bind(this, 'top_rated') } href = '#'>Топ-10</a>
            </section>
        );
    }
}

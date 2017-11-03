import React, { Component } from 'react';
import Styles from './styles.scss';

export default class MainTabs extends Component {
    constructor () {
        super();

        this.handleClick = ::this._handleClick;
    }

    _handleClick (category) {
        event.preventDefault();

        this.props.switchFilter(category);
    }

    render () {
        const { filter } = this.props;

        return (
            <section className = { Styles.container }>
                <a className = { filter == 'now_playing' ? Styles.active : '' } href = '#' onClick = { () => this.handleClick('now_playing') }>Фильмы в прокате</a>
                <a className = { filter == 'upcoming' ? Styles.active : '' } href = '#' onClick = { () => this.handleClick('upcoming') }>Скоро</a>
                <a className = { filter == 'popular' ? Styles.active : '' } href = '#' onClick = { () => this.handleClick('popular') }>Популярные</a>
                <a className = { filter == 'top_rated' ? Styles.active : '' } href = '#' onClick = { () => this.handleClick('top_rated') }>Топ-10</a>
            </section>
        );
    }
}

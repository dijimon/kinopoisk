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
                <a className = { filter !== 'popular' ? Styles.active : '' } onClick = { () => this.handleClick('popular') } href = '#'>Популярные</a>
                <a className = { filter !== 'top_rated' ? Styles.active : '' } onClick = { () => this.handleClick('top_rated') } href = '#'>Топ-10</a>
            </section>
        );
    }
}

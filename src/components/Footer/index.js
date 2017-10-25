import React, { Component } from 'react';
import Style from './styles.scss';

export default class Footer extends Component {
    render () {
        return (
            <section className = { Style.footer }>
                <h1>Footer</h1>
            </section>
        );
    }
}

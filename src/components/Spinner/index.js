import React, { Component } from 'react';
import Styles from './styles.scss';

export default class Spinner extends Component {
    render () {
        return (
            <section className = { Styles.spinner }>
                <div className = { Styles.loader } />
            </section>
        );
    }
}

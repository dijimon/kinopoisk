import React, { Component } from 'react';
import Styles from './styles.scss';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

export default class Home extends Component {
    render () {
        return (
            <section>
                <Header />
                <Main />
                <Footer />
            </section>
        )
    }
}

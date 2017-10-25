// Core
import React, { Component } from 'react';
import Home from '../../components/Home';

// Instruments
import Styles from './styles.scss';
import moment from 'moment';

export default class App extends Component {

    timer = setInterval(() => this.forceUpdate(), 1000);

    render () {
        return <Home />
    }
}

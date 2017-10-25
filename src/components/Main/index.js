import React, { Component } from 'react';
import Style from './styles.scss';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import Movie from '../Movie';

export default class Main extends Component {
    constructor () {
        super();

        this.getPopularMovies = this._getPopularMovies.bind(this);
        this.state = {
            popMovies: []
        }
    }

    componentWillMount () {
        this.getPopularMovies();
    }

    _getPopularMovies () {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=9a8d59d5385222ef85c69dd5bc16c15c&language=ru-RU&page=1&region=UA',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then((results) => {
                if (results.status !== 200) {
                    throw new Error('Films were not received.')
                }

                return results.json();
            }).then(({ results }) => {
                this.setState(({ popMovies }) => ({
                    popMovies: results
                }));
            });
    }

    render () {
        const popMovies = this.state.popMovies.map((movie, index) => {
            <Movie
                posterPath = { `https://image.tmdb.org/t/p/w300/${movie.poster_path}.jpg` }
            />
        });
        return (
            <section className = {Style.main}>
                { popMovies }
            </section>
        )
    }
}

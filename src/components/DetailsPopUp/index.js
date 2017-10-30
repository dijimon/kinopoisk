import React, { Component } from 'react';
import Styles from './styles.scss';

export default class DetailsPopUp extends Component {
    constructor () {
        super();

        this.hidePopUp = this._hidePopUp.bind(this);
    }

    _hidePopUp () {
        this.props.hidePopUp();
    }

    render () {
        const { show, movie, genres } = this.props;
        let genreNames = '';
        if (show) {
            const genreNamesArr = movie.genre_ids.map((g) => genres[g]);
            genreNames = genreNamesArr.join(', ');
        }

        return (
            <div>
                { show === true ?
                    <section onClick = { this.hidePopUp } className = { Styles.container }>
                        <section className = { Styles.popUp }>
                            <img src = { `https://image.tmdb.org/t/p/w300/${movie.poster_path}` } alt = 'movie' />
                            <div className = { Styles.content }>
                                <h2>{ movie.title }</h2>
                                <span>Дата выпуска: { movie.release_date } </span>
                                <span>Жанр: { genreNames } </span>
                                <p><span>О фильме:</span> <br />{ movie.overview } </p>
                            </div>
                        </section>
                    </section>
                    : null
                }
            </div>
        );
    }
}

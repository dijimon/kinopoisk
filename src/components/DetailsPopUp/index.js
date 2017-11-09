import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';

export default class DetailsPopUp extends Component {
    static propTypes = {
        movie: PropTypes.object,
        show:  PropTypes.bool
    }

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
                    <section className = { Styles.container } onClick = { this.hidePopUp } >
                        <section className = { Styles.popUp }>
                            <img className = { Styles.imgPoster } src = { `https://image.tmdb.org/t/p/w300/${movie.poster_path}` } alt = 'movie' />
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

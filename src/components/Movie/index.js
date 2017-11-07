import React, { Component } from 'react';
import Styles from './styles.scss';

export default class Movie extends Component {
    render () {
        const { posterPath, movie, genres, movieId, addToWishlist, addToFavoritelist, handleMovieClick, wishList, favoriteList }  = this.props;
        const genreNamesArr = movie.genre_ids.map((g) => genres[g]);
        const genreNames = genreNamesArr.join(', ');

        const wishListStr = wishList.map((e) => `${e}`);
        const wished = wishListStr.indexOf(`${movie.id}`) >= 0;

        const favoriteListStr = favoriteList.map((e) => `${e}`);
        const favorite = favoriteListStr.indexOf(`${movie.id}`) >= 0;

        let movieHeader = '';

        if (wished) {
            movieHeader = <div className = { Styles.movieHeaderWished }>
                { movieId }
                <span className = { favorite === true ? Styles.addedToFavorites : '' } onClick = { (event) => addToFavoritelist(event, movie.id, movie) } >♥</span>
                <input type = 'checkbox' checked = { wished } onChange = { (event) => addToWishlist(event, movie.id, movie) } />
            </div>;
        } else {
            movieHeader = <div className = { Styles.movieHeader }>
                { movieId }
                <span className = { favorite === true ? Styles.addedToFavorites : '' } onClick = { (event) => addToFavoritelist(event, movie.id, movie) } >♥</span>
                <input type = 'checkbox' checked = { wished } onChange = { (event) => addToWishlist(event, movie.id, movie) } />
            </div>;
        }

        return (
            <section className = { Styles.movieItem }>
                { movieHeader }
                <div className = { Styles.imgCont } onClick = { () => handleMovieClick(movie) }>
                    <img className = { Styles.emptyPoster } src = { posterPath } />
                    <div className = { Styles.transparentEl } />
                </div>
                <section onClick = { () => handleMovieClick(movie) }>
                    <span className = { Styles.title }>{ movie.title }</span>
                    <span className = { Styles.year }>{`Год: ${movie.release_date.substring(0, 4)}`}</span>
                    <span className = { Styles.year }>{ genreNames }</span>
                </section>
            </section>

        );
    }
}

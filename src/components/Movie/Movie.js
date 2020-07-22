import React from 'react'
import './Movie.css'
import noImg from '../../asset/default-img.png'

const movie = props => {
  const movies = props.movies

  const movieList = movies.map(movie => {
    return (
      <div key={movie.id} className="movie__container">
        <img
          className="movie__img"
          src={
            movie.poster_path
              ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' +
                movie.poster_path
              : noImg
          }
          alt={movie.title}
        />

        <div className="movie__content">
          <h1 className="movie__title">{movie.title}</h1>
          <div className="movie__price-box">
            <p className="movie__price-text">Price:</p>
            <input
              type="number"
              value={movie.vote_count}
              onChange={event => {
                props.setUpdate(event.target.value, movie.id)
              }}
              className="movie__price-input"
            />
            <button
              onClick={() => {
                props.addTocart({
                  title: movie.title,
                  img: movie.poster_path,
                  price: movie.vote_count,
                })
              }}
            >
              Add to Card
            </button>
          </div>
        </div>
      </div>
    )
  })
  return movieList
}

export default movie

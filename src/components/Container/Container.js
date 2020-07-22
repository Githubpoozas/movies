/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import axios from 'axios'

import MovieList from '../Movie/Movie'
import './Container.css'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      error: false,
      search: '',
      cart: 'test',
    }

    this.setUpdate = this.setUpdate.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidUpdate = () => {
    axios
      .get(
        'https://api.themoviedb.org/3/search/movie?api_key=f3d861c2da28841c370f585ada2ab60a&query=' +
          this.state.search,
      )
      .then(response => {
        // console.log(response.data.results)
        const movies = response.data.results.slice(0, 10)
        // const movies = response.data.results
        this.setState({ movies: movies })
      })
      .catch(e => {
        this.setState({
          error: true,
        })
      })
  }

  setSearch(name) {
    if (name) {
      this.setState({
        search: name,
      })
    }
  }

  setUpdate(price, id) {
    const movies = this.state.movies

    movies.map(movie => {
      if (movie.id === id) {
        movie.vote_count = price
      }
    })
    this.setState({
      movies: movies,
    })
  }

  addToCart(obj) {
    const cart = this.state.cart
    const newCart = [...cart, obj]
    this.state({
      cart: newCart,
    })
  }

  render() {
    let moviesList = <p>Someting went wrong</p>

    if (!this.state.error) {
      moviesList = (
        <MovieList
          movies={this.state.movies}
          setUpdate={this.setUpdate}
          addToCart={this.addToCart}
        />
      )
    }

    return (
      <div className="main__container">
        <div className="search__box">
          <p>Enter movie name: </p>
          <input
            type="text"
            onChange={event => this.setSearch(event.target.value)}
          />
        </div>
        <section className="moviesList">{moviesList}</section>
      </div>
    )
  }
}

export default Container

import React, { Component } from 'react';

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class PeliculaDetalle extends Component {
    constructor (props) {
        super (props);
        this.state = {
            pelicula: null,
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id;

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
                .then( response => response.json())
                .then( data => this.setState(
                    {pelicula: data}
                ))
                .catch( error => console.log(error))
    }

    render () {
        const {pelicula} = this.state;

        if (!pelicula) {
            return <p>Cargando...</p>;
        }

            return(
                <section className="row">
                    <h2 className="alert alert-primary">{pelicula.title}</h2>
                    <img className="col-md-6" src={`https://image.tmdb.org/t/p/w342/${pelicula.poster_path}`} alt=""/>
                    <section class="col-md-6 info">
                        <p className="description"> Descripción: {pelicula.overview}</p>
                        <p className="mt-0" id="votes"><strong>Rating: {pelicula.vote_average}</strong></p>
                        <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno: {pelicula.release_date}</strong></p>
                        
                        <a href="" className="btn alert-primary">🩶</a>
                    </section>
                </section>
        )
    }
}

/*
Duración está en la consigna pero no en la API
Origen de la película tampoco aparece*/

export default PeliculaDetalle;
import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';

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
            return <Loader />;
        }

            return(
                <div>
                    <h2 className="alert alert-primary">{pelicula.title}</h2>
                    <section className="row">
                        <img className="col-md-6" src={`https://image.tmdb.org/t/p/w342/${pelicula.poster_path}`} alt=""/>
                        <section className="col-md-6 info">
                            <p className="description"><strong>Descripción:</strong> {pelicula.overview}</p>
                            <p className="mt-0"><strong>Géneros:</strong> {pelicula.genres.map(genero => genero.name)}</p>
                            <p className="mt-0" id="votes"><strong>Rating: {pelicula.vote_average}</strong></p>
                            <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno: {pelicula.release_date}</strong></p>
                            <p class="mt-0 mb-0 length"><strong>Duración:</strong> {}</p>
                            
                            <a href="" className="btn alert-primary">🩶</a>
                        </section>
                    </section>
                </div>
        )
    }
}


/*
DURACION API
cómo hago para separar cada género en el mapeo. chat sugirió .join(", ") después de name
*/

export default PeliculaDetalle;
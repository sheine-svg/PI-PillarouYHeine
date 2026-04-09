import React, { Component } from 'react';

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class SerieDetalle extends Component {
    constructor (props) {
        super (props);
        this.state = {
            serie: null,
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id;

        fetch(`https://api.themoviedb.org/3/tv/?${id}?api_key=${apiKey}`)
                .then( response => response.json())
                .then( data => this.setState(
                    {serie: data}
                ))
                .catch( error => console.log(error))
    }

    render () {
        const {serie} = this.state;

        if (!serie) {
            return <p>Cargando...</p>;
        }

            return(
            <section className="row">
                <section className="col-md-6 info">
                    <p className="description">{serie.overview}</p>
                    <img class="col-md-6" src={`https://image.tmdb.org/t/p/w342/${serie.poster_path}`}/>
                    <h2 class="alert -alert-warning">{serie.name}</h2>
                    <h2>{serie.vote_average}</h2>
                    <p class="mt-0 mb-0" id="release-date"><strong>{serie.first_air_date}</strong></p>
                    <a href="" class="btn alert-primary">🩶</a>
                    </section>
            </section>
        )
    }
}

/*
Generos es un array*/

export default SerieDetalle;

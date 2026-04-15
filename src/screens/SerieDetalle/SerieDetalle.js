import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';

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

        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
                .then( response => response.json())
                .then( data => this.setState(
                    {serie: data}
                ))
                .catch( error => console.log(error))
    }

    render () {
        const {serie} = this.state;

        if (!serie) {
            return <Loader />;
        }

            return(
                <div>
                    <h2 className="alert alert-warning">{serie.name}</h2>
                    <section className="row">
                        <section className="col-md-6 info">
                            <img className="col-md-6" src={`https://image.tmdb.org/t/p/w342/${serie.poster_path}`}/>
                            <p className="description"> <strong>Descripción:</strong> {serie.overview}</p>
                            <p className="mt-0"><strong>Géneros:</strong> {serie.genres.map(genero => genero.name)}</p>
                            <p><strong>Rating:</strong> {serie.vote_average}</p>
                            <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> {serie.first_air_date}</p>
                            <button type="button" className="btn alert-primary">🩶</button>
                        </section>
                    </section>
                </div>
        )
    }
}

/*
cómo hago para separar cada género en el mapeo. chat sugirió .join(", ") después de name
*/

export default SerieDetalle;

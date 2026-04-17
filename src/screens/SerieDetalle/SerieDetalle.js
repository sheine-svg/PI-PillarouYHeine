import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import Cookies from "universal-cookie";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";
const cookies = new Cookies();

class SerieDetalle extends Component {
    constructor (props) {
        super (props);
        this.state = {
            serie: null,
            esFav: false,
        }
    }

    componentDidMount () {
        const id = Number(this.props.match.params.id);

        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
                .then( response => response.json())
                .then( data => this.setState(
                    {serie: data}
                ))
                .catch( error => console.log(error))

        let recuperoStorage = localStorage.getItem("seriesFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(id)){
            this.setState({
                esFav: true
            });
        }
    }

    agregarOSacarFav() {
        let recuperoStorage = localStorage.getItem("seriesFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(this.state.serie.id)){
            let seriesFiltradas = favoritos.filter(id => id !== this.state.serie.id);
            localStorage.setItem("seriesFavs", JSON.stringify(seriesFiltradas));

            this.setState({
                esFav: false
            });
            return;
        } else{
            favoritos.push(this.state.serie.id);
            localStorage.setItem("seriesFavs", JSON.stringify(favoritos));

            this.setState({
                esFav: true
            });
            return;
        }
    }

    render () {

        let botonFav;
        let usuarioLogueado = cookies.get("user")
        if (usuarioLogueado) {
            botonFav = (<button onClick={ () => this.agregarOSacarFav()} type="button" className="btn alert-primary">{this.state.esFav ? "❤️" : "🩶"}</button>)
        }

            return(
                <div>
                    {this.state.serie === null ? <Loader /> :
                    <div>
                        <h2 className="alert alert-warning">{this.state.serie.name}</h2>
                        <section className="row">
                            <section className="col-md-6 info">
                                <img className="col-md-6" src={`https://image.tmdb.org/t/p/w342/${this.state.serie.poster_path}`}/>
                                <p className="description"> <strong>Descripción:</strong> {this.state.serie.overview}</p>
                                <p className="mt-0"><strong>Géneros:</strong> {this.state.serie.genres.map(genero => genero.name)}</p>
                                <p><strong>Rating:</strong> {this.state.serie.vote_average}</p>
                                <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> {this.state.serie.first_air_date}</p>
                                {botonFav}
                            </section>
                        </section>
                    </div> 
                    }
                </div>
        )
    }
}

/*
cómo hago para separar cada género en el mapeo. chat sugirió .join(", ") después de name
*/

export default SerieDetalle;

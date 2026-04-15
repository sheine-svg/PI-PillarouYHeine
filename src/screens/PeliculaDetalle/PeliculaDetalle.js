import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import Cookies from "universal-cookie";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";
const cookies = new Cookies();

class PeliculaDetalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: null,
            esFav: false,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => this.setState(
                { pelicula: data }
            ))
            .catch(error => console.log(error))

        let recuperoStorage = localStorage.getItem("pelisFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(id)) {

            this.setState({
                esFav: true
            });
        } 
    }

    agregarOSacarFav() {
        let recuperoStorage = localStorage.getItem("pelisFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(this.state.pelicula.id)) {
            let pelisFiltradas = favoritos.filter(id => id !== this.state.pelicula.id);
            localStorage.setItem("pelisFavs", JSON.stringify(pelisFiltradas));

            this.setState({
                esFav: false
            });
        } else {
            favoritos.push(this.state.pelicula.id);
            localStorage.setItem("pelisFavs", JSON.stringify(favoritos));

            this.setState({
                esFav: true
            });
        }
    }

    render() {

        let botonFav;
        let usuarioLogueado = cookies.get("user")
        if (usuarioLogueado) {
            botonFav = (<button onClick={() => this.agregarOSacarFav()} type="button" className="btn alert-primary">{this.state.esFav ? "❤️" : "🩶"}</button>)
        }

        return (
            <div>
                {this.state.pelicula === null ? <Loader /> :
                    <div>
                        <h2 className="alert alert-primary">{this.state.pelicula.name}</h2>
                        <section className="row">
                            <img className="col-md-6" src={`https://image.tmdb.org/t/p/w342/${this.state.pelicula.poster_path}`} alt="" />
                            <section className="col-md-6 info">
                                <p className="description"><strong>Descripción:</strong> {this.state.pelicula.overview}</p>
                                <p className="mt-0"><strong>Géneros:</strong> {this.state.pelicula.genres.map(genero => genero.name)}</p>
                                <p className="mt-0" id="votes"><strong>Rating: {this.state.pelicula.vote_average}</strong></p>
                                <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno: {this.state.pelicula.release_date}</strong></p>
                                <p class="mt-0 mb-0 length"><strong>Duración:</strong> { }</p>

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
DURACION API
cómo hago para separar cada género en el mapeo. chat sugirió .join(", ") después de name
*/

export default PeliculaDetalle;
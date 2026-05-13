import { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import Cookies from "universal-cookie";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";
const cookies = new Cookies();

function PeliculaDetalle(props) {
    const [pelicula, setPelicula] = useState(null);
    const [esFav, setEsFav] = useState(false);

    useEffect(() => {
        const id = Number(props.match.params.id);

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => setPelicula(data))
            .catch(error => console.log(error))

        let recuperoStorage = localStorage.getItem("pelisFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(id)) {
            setEsFav(true);
        }
    }, [])

    function agregarOSacarFav() {
        let recuperoStorage = localStorage.getItem("pelisFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(pelicula.id)) {
            let pelisFiltradas = favoritos.filter(id => id !== pelicula.id);
            localStorage.setItem("pelisFavs", JSON.stringify(pelisFiltradas));

            setEsFav(false);

        } else {
            favoritos.push(pelicula.id);
            localStorage.setItem("pelisFavs", JSON.stringify(favoritos));

            setEsFav(true);
        }
    }

    return (
        <div>
            {pelicula === null ? <Loader /> :
                <div>
                    <h2 className="alert alert-primary">{pelicula.title}</h2>
                    <section className="row">
                        <img className="col-md-6" src={`https://image.tmdb.org/t/p/w342/${pelicula.poster_path}`} alt="" />
                        <section className="col-md-6 info">
                            <p className="description"><strong>Descripción:</strong> {pelicula.overview}</p>
                            <p className="mt-0"><strong>Géneros:</strong> {pelicula.genres.map(genero => genero.name).join(", ")}</p>
                            <p className="mt-0" id="votes"><strong>Rating: {pelicula.vote_average}</strong></p>
                            <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno: {pelicula.release_date}</strong></p>
                            <p class="mt-0 mb-0 length"><strong>Duración:</strong> {pelicula.runtime} minutos</p>

                            {cookies.get("user") ?
                                (<button onClick={() => agregarOSacarFav()} type="button" className="btn alert-primary">{esFav ? "❤️" : "🩶"}</button>)
                                : null}
                        </section>
                    </section>
                </div>
            }
        </div>
    )
}

export default PeliculaDetalle;
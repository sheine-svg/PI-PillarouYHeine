import { useState, useEffect } from "react";
import Loader from '../../components/Loader/Loader';
import Cookies from "universal-cookie";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";
const cookies = new Cookies();

function SerieDetalle(props) {
    const [serie, setSerie] = useState(null);
    const [esFav, setEsFav] = useState(false);

    useEffect(() => {
        const id = Number(props.match.params.id);

        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => setSerie(data))
            .catch(error => console.log(error))
        
        let recuperoStorage = localStorage.getItem("seriesFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(id)) {
            setEsFav(true)
        }
    }, [])

    function agregarOSacarFav() {
        let recuperoStorage = localStorage.getItem("seriesFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(serie.id)) {
            let seriesFiltradas = favoritos.filter(id => id !== serie.id);
            localStorage.setItem("seriesFavs", JSON.stringify(seriesFiltradas));
            setEsFav(false)
            return;
        } else {
            favoritos.push(serie.id);
            localStorage.setItem("seriesFavs", JSON.stringify(favoritos));
            setEsFav(true)
            return;
        }
    }

    return (
            <div>
                {serie === null ? <Loader /> :
                    <div>
                        <h2 className="alert alert-warning">{serie.name}</h2>
                        <section className="row">
                            <section className="col-md-6 info">
                                <img className="col-md-6" src={`https://image.tmdb.org/t/p/w342/${serie.poster_path}`} />
                                <p className="description"> <strong>Descripción:</strong> {serie.overview}</p>
                                <p className="mt-0"><strong>Géneros:</strong> {serie.genres.map(genero => genero.name).join(", ")}</p>
                                <p><strong>Rating:</strong> {serie.vote_average}</p>
                                <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> {serie.first_air_date}</p>
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

export default SerieDetalle;
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Cookies from "universal-cookie";

const cookies = new Cookies();

function UnaSeriePopular(props) {
    const [descripcion, setDescripcion] = useState(false);
    const [esFav, setEsFav] = useState(false);

    useEffect(() => {
        let recuperoStorage = localStorage.getItem("seriesFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(props.info.id)) {
            setEsFav(true)
        }
    }, [])

    function mostrarMas() {
        setDescripcion(!descripcion)
    }

    function agregarOSacarFav() {
        let recuperoStorage = localStorage.getItem("seriesFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(props.info.id)) {
            let seriesFiltradas = favoritos.filter(id => id !== props.info.id);
            localStorage.setItem("seriesFavs", JSON.stringify(seriesFiltradas));
            setEsFav(false)
        } else {
            favoritos.push(props.info.id);
            localStorage.setItem("seriesFavs", JSON.stringify(favoritos));
            setEsFav(true)
        }
    }

    let ver;
    let clase;

    if (descripcion == false) {
        ver = <p>Ver descripción</p>
        clase = "hide"
    }
    else {
        ver = <p>Ocultar descripción</p>
        clase = "show card-text"
    }

    let seccion;

    if (descripcion === true) {
        seccion = (
            <p className="card-text">{props.info.overview}</p>
        );
    }

    return (
        <article className='single-card-playing'>
            <img src={`https://image.tmdb.org/t/p/w342/${props.info.poster_path}`} alt="" className="card-img-top" />
            <div className="cardBody">
                <h5 className="card-title">{props.info.name}</h5>
                <button className='btn btn-primary' onClick={() => mostrarMas()}>{ver}</button>
                {seccion}
                <Link className="btn btn-primary" to={`/SerieDetalle/${props.info.id}`}>Detalle Serie</Link>
                {cookies.get("user") ?
                    (<button onClick={() => agregarOSacarFav()} type="button" className="btn alert-primary">{esFav ? "❤️" : "🩶"}</button>)
                    : null}
            </div>
        </article>
    )
}

export default UnaSeriePopular;
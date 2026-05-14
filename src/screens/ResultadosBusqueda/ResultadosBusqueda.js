import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import UnaPeliPopular from "../../components/UnaPeliPopular/UnaPeliPopular";
import UnaSeriePopular from "../../components/UnaSeriePopular/UnaSeriePopular";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

function ResultadosBusqueda(props) {
    const [buscar, setBuscar] = useState("");
    const [opcion, setOpcion] = useState("");
    const [arrayBusqueda, setArrayBusqueda] = useState([]);

    useEffect(() => {
        const busqueda = props.match.params.busqueda;
        const tipo = props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=${apiKey}&query=${busqueda}`)
            .then(response => response.json())
            .then(data =>  setArrayBusqueda(data.results) || [] )
            .catch(error => console.log(error))
    }, [])

    const tipo = props.match.params.tipo;

    return (
        <section className="row cards">
            {arrayBusqueda.length === 0 ? (
                <Loader />
            ) : tipo === "movie" ? (
                arrayBusqueda.map(peli => (
                    <UnaPeliPopular key={peli.id} info={peli} />
                ))
            ) : (
                arrayBusqueda.map(serie => (
                    <UnaSeriePopular key={serie.id} info={serie} />
                ))
            )}
        </section>
    )
}

export default ResultadosBusqueda;
import { useState, useEffect } from "react";
import UnaSeriePopular from "../../components/UnaSeriePopular/UnaSeriePopular";
import Loader from "../../components/Loader/Loader";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

function TodasLasSeries() {
    const [arraySeriesPopulares, setArraySeriesPopulares] = useState([]);
    const [contador, setContador] = useState(1);
    const [buscarSerie, setBuscarSerie] = useState("");
    const [arraySeriesPopularesCopia, setArraySeriesPopularesCopia] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=" + apiKey)
            .then(response => response.json())
            .then(data => {
                setArraySeriesPopulares(data.results)
                setArraySeriesPopularesCopia(data.results)
                localStorage.setItem("arrayTodasLasSeries", JSON.stringify(data.results))
            })
            .catch(error => console.log(error))
    }, [])

    function cargarMasSeries() {
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${contador + 1}`)
            .then(response => response.json())
            .then(data => {
                setArraySeriesPopulares(arraySeriesPopulares.concat(data.results),
                setArraySeriesPopularesCopia(arraySeriesPopularesCopia.concat(data.results)),
                setContador(contador + 1))
                localStorage.setItem("arrayTodasLasSeries", JSON.stringify(arraySeriesPopulares.concat(data.results)))
            })
            .catch(error => console.log(error))
    }

    function evitarSubmit(event) {
        event.preventDefault();
    }

    function controlarCambios(event) {
        setBuscarSerie(event.target.value)

        if (buscarSerie != "") {
            let seriesFiltradas = arraySeriesPopularesCopia.filter(serie =>
                serie.name.toLowerCase().includes(buscarSerie.toLowerCase()));

            setArraySeriesPopulares(seriesFiltradas)
        }
    }

    return (
        <div>
            <h2 className="alert alert-primary">Todas las series populares</h2>

            <form onSubmit={(event) => evitarSubmit(event)}>
                <label className="buscadorDeTodas">Buscar una serie</label>
                <input className="inputDeTodas" type="text" onChange={(event) => controlarCambios(event)} value={buscarSerie}></input>
            </form>

            <section className='row cards' id="now-playing">
                {arraySeriesPopulares.length === 0 ?
                    <Loader /> :
                    arraySeriesPopulares.map(serie => <UnaSeriePopular key={serie.id} info={serie} />)
                }
            </section>

            <section>
                <button className="btn btn-primary" onClick={() => cargarMasSeries()}>Más series</button>
            </section>
        </div>
    )
}

export default TodasLasSeries;
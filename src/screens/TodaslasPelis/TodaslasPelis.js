import { useState, useEffect } from "react";
import UnaPeliPopular from "../../components/UnaPeliPopular/UnaPeliPopular";
import Loader from "../../components/Loader/Loader";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

function TodaslasPelis(props) {
    const [arrayPeliculasPopulares, setArrayPeliculasPopulares] = useState([]);
    const [contador, setContador] = useState(1);
    const [buscarPeli, setBuscarPeli] = useState("");
    const [arrayPeliculasPopularesCopia, setArrayPeliculasPopularesCopia] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey)
            .then(response => response.json())
            .then(data => 
                {   
                    setArrayPeliculasPopulares(data.results)
                    setArrayPeliculasPopularesCopia(data.results)
                    localStorage.setItem("arrayTodasLasPelis", JSON.stringify(data.results))
            }
        )
            .catch(error => console.log(error))
    }, [])

    function cargarMasPeliculas() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${contador + 1}`)
            .then(response => response.json())
            .then(data => {
                setArrayPeliculasPopulares(arrayPeliculasPopulares.concat(data.results))
                    setArrayPeliculasPopularesCopia(arrayPeliculasPopularesCopia.concat(data.results),
                        setContador(contador + 1))
                    localStorage.setItem("arrayTodasLasPelis", JSON.stringify(arrayPeliculasPopulares.concat(data.results)))
            })
            .catch(error => console.log(error))
    }

    function evitarSubmit(event) {
        event.preventDefault();
    }

    function controlarCambios(event) {
        setBuscarPeli(event.target.value);

        if (buscarPeli != "") {
            let pelisFiltradas = arrayPeliculasPopularesCopia.filter(peli =>
                peli.title.toLowerCase().includes(buscarPeli.toLowerCase()));

            setArrayPeliculasPopulares(pelisFiltradas)
        }
    }

    return (
        <div>
            <h2 className="alert alert-primary">Todas las películas populares</h2>

            <form onSubmit={(event) => evitarSubmit(event)}>
                <label className="buscadorDeTodas">Buscar una película</label>
                <input className="inputDeTodas" type="text" onChange={(event) => controlarCambios(event)} value={buscarPeli}></input>
            </form>

            <section className='row cards' id="movies">
                {arrayPeliculasPopulares.length === 0 ?
                    <Loader /> :
                    arrayPeliculasPopulares.map(peli => <UnaPeliPopular key={peli.id} info={peli} />)
                }
            </section>

            <section>
                <button className="btn btn-primary" onClick={() => cargarMasPeliculas()}>Más películas</button>
            </section>
        </div>
    )
}

export default TodaslasPelis;
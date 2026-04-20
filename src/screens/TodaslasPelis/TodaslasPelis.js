import React, { Component } from "react";
import UnaPeliPopular from "../../components/UnaPeliPopular/UnaPeliPopular";
import Loader from "../../components/Loader/Loader";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class TodaslasPelis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayPeliculasPopulares: [],
            contador: 1,
            buscarPeli: "",
            arrayPeliculasPopularesCopia: [],
        }
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    arrayPeliculasPopulares: data.results,
                    arrayPeliculasPopularesCopia: data.results
                })
                localStorage.setItem("arrayTodasLasPelis", JSON.stringify(data.results));
            })
            .catch(error => console.log(error))
    }

    cargarMasPeliculas() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${this.state.contador + 1}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    arrayPeliculasPopulares: this.state.arrayPeliculasPopulares.concat(data.results),
                    arrayPeliculasPopularesCopia: this.state.arrayPeliculasPopularesCopia.concat(data.results),
                    contador: this.state.contador + 1,
                });
                localStorage.setItem("arrayTodasLasPelis", JSON.stringify(this.state.arrayPeliculasPopulares.concat(data.results)))
            })
            .catch(error => console.log(error))
    }

    evitarSubmit(event) {
        event.preventDefault();
    }

    controlarCambios(event) {
        this.setState({ buscarPeli: event.target.value });

        if (this.state.buscarPeli != "") {
            let pelisFiltradas = this.state.arrayPeliculasPopularesCopia.filter(peli =>
                peli.title.toLowerCase().includes(this.state.buscarPeli.toLowerCase()));

            this.setState({
                arrayPeliculasPopulares: pelisFiltradas
            })
        }
    }

    render() {
        return (
            <div>
                <h2 className="alert alert-primary">Todas las películas populares</h2>

                <form onSubmit={(event) => this.evitarSubmit(event)}>
                    <label className="buscadorDeTodas">Buscar una película</label>
                    <input className="inputDeTodas" type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.buscarPeli}></input>
                </form>

                <section className='row cards' id="movies">
                    {this.state.arrayPeliculasPopulares.length === 0 ?
                        <Loader /> :
                        this.state.arrayPeliculasPopulares.map(peli => <UnaPeliPopular key={peli.id} info={peli} />)
                    }
                </section>

                <section>
                    <button className="btn btn-primary" onClick={() => this.cargarMasPeliculas()}>Más películas</button>
                </section>
            </div>
        )
    }
}

export default TodaslasPelis;
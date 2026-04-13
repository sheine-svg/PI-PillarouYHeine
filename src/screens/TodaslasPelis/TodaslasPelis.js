import React, {Component} from "react";
import UnaPeliPopular from "../../components/UnaPeliPopular/UnaPeliPopular";
import Loader from "../../components/Loader/Loader";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class TodaslasPelis extends Component {
    constructor (props) {
        super (props)
        this.state = {
            arrayPeliculasPopulares: [],
            masArrayPeliculasPopulares: [],
        }
    }

    componentDidMount () {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key="+apiKey)
                .then( response => response.json())
                .then( data => this.setState(
                    {arrayPeliculasPopulares: data.results,
                        masArrayPeliculasPopulares: data.total_pages.results}
                ))
                .catch( error => console.log(error))
    }

    cargarMasPeliculas() {
        fetch(this.state.masArrayPeliculasPopulares)
            .then( response => response.json())
                .then( data => this.setState({
                    arrayPeliculasPopulares: this.state.arrayPeliculasPopulares.concat(data.results),
                    masArrayPeliculasPopulares: data.results
                }
                ))
                .catch( error => console.log(error))
    }

    render () {
        return(
            <div>
                <h2 className="alert alert-primary">Todas las películas populares</h2>
                <section className='row cards' id="movies">
                    {this.state.arrayPeliculasPopulares.length === 0 ?
                    <Loader /> : 
                    this.state.arrayPeliculasPopulares.map(peli => <UnaPeliPopular key={peli.id} info={peli} /> )
                    }
                </section>
                <section>
                    <button onClick={() => this.cargarMasPeliculas()}>Mas películas</button>
                </section>
            </div>
        )
    }
}

/*Estructura OK, preguntar sobre la API*/

export default TodaslasPelis;
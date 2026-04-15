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
            contador: 0,
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
        fetch(`"https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}%?page=${this.state.contador}"`)
                .then( response => response.json())
                .then( data => this.setState({
                    arrayPeliculasPopulares: this.state.arrayPeliculasPopulares.concat(data.results),
                    masArrayPeliculasPopulares: data.results
                }
                ))
                .catch( error => console.log(error))
        
        this.setState({
            contador: this.state.contador + 1
        })
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
                    <button className="btn btn-primary" onClick={() => this.cargarMasPeliculas()}>Mas películas</button>
                </section>
            </div>
        )
    }
}

export default TodaslasPelis;
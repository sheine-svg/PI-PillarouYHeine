import React, {Component} from "react";
import UnaPeliPopular from "../../components/UnaPeliPopular/UnaPeliPopular";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class TodaslasPelis extends Component {
    constructor (props) {
        super (props)
        this.state = {
            arrayPeliculasPopulares: []
        }
    }

    componentDidMount () {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key="+apiKey)
                .then( response => response.json())
                .then( data => this.setState(
                    {arrayPeliculasPopulares: data.results}
                ))
                .catch( error => console.log(error))
    }

    render () {
        return(
                <section className='row cards' id="movies">
                    <h2 className="alert alert-primary">Todas las películas populares</h2>
                    {this.state.arrayPeliculasPopulares.length === 0 ?
                    <h3>Cargando...</h3> : 
                    this.state.arrayPeliculasPopulares.map(peli => <UnaPeliPopular key={peli.id} info={peli} /> )
                    }
                </section>
        )
    }
}

export default TodaslasPelis;
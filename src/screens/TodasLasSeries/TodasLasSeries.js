import React, {Component} from "react";
import UnaSeriePopular from "../../components/UnaSeriePopular/UnaSeriePopular";
import Loader from "../../components/Loader/Loader";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class TodasLasSeries extends Component {
    constructor (props) {
        super (props)
        this.state = {
            arrayPeliculasPlaying: []
        }
    }

    componentDidMount () {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key="+apiKey)
                .then( response => response.json())
                .then( data => this.setState(
                    {arrayPeliculasPlaying: data.results}
                ))
                .catch( error => console.log(error))
    }

    render () {
        return(
            <div>
                <h2 className="alert alert-primary">Todas las series populares</h2>
                <section className='row cards' id="now-playing">
                    {this.state.arrayPeliculasPlaying.length === 0 ?
                    <Loader /> : 
                    this.state.arrayPeliculasPlaying.map(peli => <UnaSeriePopular key={peli.id} info={peli} /> )
                    }
                </section>
            </div>
        )
    }
}

export default TodasLasSeries;
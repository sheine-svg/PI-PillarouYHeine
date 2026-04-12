import React, {Component} from "react";
import UnaSeriePopular from "../UnaSeriePopular/UnaSeriePopular";
import Loader from "../Loader/Loader";
import {Link} from 'react-router-dom';

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class SectionSerie extends Component {
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
                    {arrayPeliculasPlaying: data.results.slice(0, 6)}
                ))
                .catch( error => console.log(error))
    }

    render () {
        return(
                <section className='row cards' id="now-playing">
                    {this.state.arrayPeliculasPlaying.length === 0 ?
                    <Loader /> : 
                    this.state.arrayPeliculasPlaying.map(peli => <UnaSeriePopular key={peli.id} info={peli} /> )
                    }
                    <Link id="todas" className="btn btn-primary" to={`/TodasLasSeries`}>Ver todas las series</Link>
                </section>
        )
    }
}

export default SectionSerie;
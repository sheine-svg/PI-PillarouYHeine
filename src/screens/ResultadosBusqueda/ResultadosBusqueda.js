import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import UnaPeliPopular from "../../components/UnaPeliPopular/UnaPeliPopular";
import UnaSeriePopular from "../../components/UnaSeriePopular/UnaSeriePopular";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class ResultadosBusqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buscar: "",
            opcion: "",
            arrayBusqueda: []
        }
    }

    componentDidMount() {
        const busqueda = this.props.match.params.busqueda;
        const tipo = this.props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=${apiKey}&query=${busqueda}`)
            .then(response => response.json())
            .then(data => this.setState(
                { arrayBusqueda: data.results || []}
            ))
            .catch(error => console.log(error))
    }

    render() {
        const tipo = this.props.match.params.tipo;
        return (
            <section>
                {this.state.arrayBusqueda.length === 0 ? (
                    <Loader />
                ) : tipo === "movie" ? (
                    this.state.arrayBusqueda.map(peli => (
                        <UnaPeliPopular key={peli.id} info={peli} />
                    ))
                ) : (
                    this.state.arrayBusqueda.map(serie => (
                        <UnaSeriePopular key={serie.id} info={serie} />
                    ))
                )}
            </section>
        );
    }
};

export default ResultadosBusqueda;
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ResultadosBusqueda extends Component {
    constructor (props) {
        super(props);
        this.state = {
            buscar: "",
        }
    }

    controlarCambios(event){
        this.setState({
            buscar: event.target.value
        });
    }

    ejectuarBusqueda(event){
        event.preventDefault();
        this.props.history.push(`/search?query=${this.state.buscar}`);
    }
}

export default ResultadosBusqueda;
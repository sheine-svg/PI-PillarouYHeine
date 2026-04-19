import React, { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campo: "",
            boton: "",
            error: ""
        }
    }

    evitarSubmit(event) {
        event.preventDefault();
        this.props.history.push("/ResultadosBusqueda/" + this.state.campo + "/" + this.state.boton)
    }

    controlarCambios(event) {
        this.setState({
            campo: event.target.value
        });
    }

    controlarBoton(event) {
        this.setState({
            boton: event.target.value
        })

    }

    condicionesForm() {
        if (this.state.campo === "") {
            this.setState({
                error: "Debes completar el campo de búsqueda"
            })
            return
        }
    }

    render() {
        return (
            <form onSubmit={(event) => this.evitarSubmit(event)} className="search-form" method="get">
                <div className="opcionesRadio">
                    <div className="opcionRadio">
                        <input onChange={(e) => this.controlarBoton(e)} type="radio" className="input-radio" name="contenido" value="movie" required />
                        <span>Película</span>
                    </div>

                    <div className="opcionRadio">
                        <input onChange={(e) => this.controlarBoton(e)} type="radio" className="input-radio" name="contenido" value="tv" required />
                        <span>Serie</span>
                    </div>
                </div>
                <div className="buscadorYBoton">
                    <input className="inputBuscador" type="text" onChange={(e) => this.controlarCambios(e)} name="searchData" placeholder="Buscar..." value={this.state.campo} />
                    <button onClick={() => this.condicionesForm()} type="submit" className="btn btn-success btn-sm botonBuscador">Buscar</button>
                </div>
                <p className="mjeErrorBuscador">{this.state.error}</p>
            </form>
        )
    }
}

export default withRouter(Buscador);
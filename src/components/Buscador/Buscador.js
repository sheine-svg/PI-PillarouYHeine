import React, { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class Buscador extends Component {
    constructor(props){
        super(props)
        this.state = {
            campo: "",
            boton: "",
            error: ""
        }
    }

    evitarSubmit(event) {
        event.preventDefault();
        this.props.history.push("/ResultadosBusqueda/" + this.state.campo + "/" + this.state.boton )
    }

    controlarCambios(event){
        this.setState({
            campo: event.target.value
        });
    }

    controlarBoton(event){
       this.setState({
            boton: event.target.value
       })

    }

    condicionesForm(){
        if (this.state.campo === "") {
            this.setState({
                error: "Debes completar el campo de búsqueda"
            })
            return
        }
    }

    render (){
        return(
            <form onSubmit={(event) => this.evitarSubmit(event)} className="search-form" method="get">
                <input onChange={(e) => this.controlarBoton(e)} type="radio" className="inputOpciones" name="contenido" value="movie" required/> 
                <span>Película</span>

                <input onChange={(e) => this.controlarBoton(e)} type="radio" className="inputOpciones" name="contenido" value="tv" required/>
                <span>Serie</span>
                
                <input type="text" onChange={(e) => this.controlarCambios(e)} name="searchData" placeholder="Buscar..." value={this.state.campo}/>

                <p>{this.state.error}</p>
            <button onClick={() => this.condicionesForm()} type="submit" className="btn btn-success btn-sm">Buscar</button>
        </form>
        )
    }
}

export default withRouter(Buscador)

/*
pedir ayuda para las condiciones
*/
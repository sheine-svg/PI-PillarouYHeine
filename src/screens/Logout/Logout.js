import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    cerrarSesion(){
        cookies.remove("user")
        this.props.history.push("/")
    }

    render() {
        return (
            <div className="divNotFound">
                <h3>¿Estás seguro que querés cerrar sesión?</h3>
                <button onClick={() => this.cerrarSesion()} type="button" className="btn btn-primary">Cerrar sesión</button>
            </div>
        )
    }
}

export default Logout;

// se borra la cookie pero pasa lo mismo que al iniciar sesion, hay que recargar la página
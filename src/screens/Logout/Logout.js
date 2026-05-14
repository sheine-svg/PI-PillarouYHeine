import { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Logout(props) {

    function cerrarSesion() {
        cookies.remove("user")
        props.history.push("/")
    }

    return (
        <div className="divNotFound">
            <h3>¿Estás seguro que querés cerrar sesión?</h3>
            <button onClick={() => cerrarSesion()} type="button" className="btn btn-primary">Cerrar sesión</button>
        </div>
    )
}

export default Logout;
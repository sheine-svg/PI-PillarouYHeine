import { useState } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function Buscador(props) {
    const [campo, setCampo] = useState("");
    const [boton, setBoton] = useState("");
    const [error, setError] = useState("");

    function evitarSubmit(event) {
        event.preventDefault();
        props.history.push("/ResultadosBusqueda/" + this.state.campo + "/" + this.state.boton)
    }

    function controlarCambios(event) {
        setCampo(event.targer.value)
    }

    function controlarBoton(event) {
        setBoton(event.target.value)
    }

    function condicionesForm() {
        if (campo === "") {
            setError("Debes completar el campo de búsqueda")
            return
        }
    }

    return (
        <form onSubmit={(event) => evitarSubmit(event)} className="search-form" method="get">
            <div className="opcionesRadio">
                <div className="opcionRadio">
                    <input onChange={(e) => controlarBoton(e)} type="radio" className="input-radio" name="contenido" value="movie" required />
                    <span>Película</span>
                </div>

                <div className="opcionRadio">
                    <input onChange={(e) => controlarBoton(e)} type="radio" className="input-radio" name="contenido" value="tv" required />
                    <span>Serie</span>
                </div>
            </div>
            <div className="buscadorYBoton">
                <input className="inputBuscador" type="text" onChange={(e) => controlarCambios(e)} name="searchData" placeholder="Buscar..." value={campo} />
                <button onClick={() => condicionesForm()} type="submit" className="btn btn-success btn-sm botonBuscador">Buscar</button>
            </div>
            <p className="mjeErrorBuscador">{this.state.error}</p>
        </form>
    )
}

export default withRouter(Buscador);
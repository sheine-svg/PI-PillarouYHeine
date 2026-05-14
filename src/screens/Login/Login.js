import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies()

function Login(props) {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function evitarSubmit(event) {
        event.preventDefault();
    }

    function controlarMail(event) {
        setMail(event.targer.value)
    }

    function controlarPassword(event) {
        setPassword(event.targer.value)
    }

    function onSubmit() {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let filtrarUsuario = usuarios.filter(unUsuario =>
            unUsuario.mail === mail &&
            unUsuario.password === password
        )

        if (filtrarUsuario.length > 0) {
            setError("¡Uusario correcto!")
            props.history.push("/")

            if (mail) {
                cookies.set("user", mail)
            }
            return;
        } else {
            setError("Credenciales incorrectas")
            return;
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={(event) => evitarSubmit(event)}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" onChange={(event) => controlarMail(event)} value={mail} className="form-control" id="email" placeholder="Ingresá tu email" />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input type="password" value={password} onChange={(event) => controlarPassword(event)} className="form-control" id="password" placeholder="Ingresá tu contraseña" />
                    </div>
                    {error}
                    <button onClick={() => onSubmit()} type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                </form>
                <p className="mt-3 text-center">¿No tenés cuenta? <Link to="/CrearCuenta">Registrarse</Link></p>
            </div>
        </div>
    )
}

export default Login;
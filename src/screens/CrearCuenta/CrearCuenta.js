import { useState } from "react";

function CrearCuenta(props){
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function evitarSubmit(event) {
        event.preventDefault();
    }

    function controlarMail(event) {
        setMail(event.target.value);
    };

    function controlarPassword(event) {
        setPassword(event.target.value);
    }

    function controlarCampos() {
        let usuariosLocalStorage = localStorage.getItem("usuarios")
        let usuariosParseado = JSON.parse(usuariosLocalStorage)
        if (mail === "" || password === "") {
            setError("Debes completar todos los campos");
            return;
        }
        if (password.length < 6) {
            setError( "La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (!mail.includes("@")) {
            setError( "El mail debe contener @");
            return;
        }

        let usuario = {
            mail: mail,
            password: password
        }

        if (usuariosLocalStorage == null) {
            let arrayAEnviar = [];
            arrayAEnviar.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(arrayAEnviar))
            props.history.push("/Login")
        } else {
            if (usuariosParseado.find(user => user.mail === mail)) {
                setError("El mail ya existe");
                return;
            }
            usuariosParseado.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuariosParseado));
            props.history.push("/Login");
        };
    };

    return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={(event) => evitarSubmit(event)}>
                        <div className="form-group">
                            <label>Mail:</label>
                            <input type="email" onChange={(event) => controlarMail(event)} value={mail} id="email" placeholder="Ingresá tu email" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" value={password} onChange={(event) => controlarPassword(event)} className="form-control" id="password" placeholder="Ingresá tu contraseña" />
                        </div>
                        {error}
                        <button onClick={() => controlarCampos()} type="submit" className="btn btn-primary btn-block">Registrarse</button>
                    </form>
                </div>
            </div>
        );

}

export default CrearCuenta;
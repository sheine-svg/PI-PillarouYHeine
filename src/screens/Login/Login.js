import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies()

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            error: "",
        };
    }

    evitarSubmit(event) {
        event.preventDefault();
    }

    controlarMail = (event) => {
        this.setState({
            mail: event.target.value
        });

    };

    controlarPassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    onSubmit(mail, password){
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let filtrarUsuario = usuarios.filter(unUsuario =>
            unUsuario.mail === this.state.mail &&
            unUsuario.password === this.state.password
        )

        if (usuarios.length === 0) {
            this.setState({
                error: "La contraseña o mail es incorrecto"
            });
            return;
        } else if (filtrarUsuario.length > 0) {
            this.setState({
                error: "Usuario correcto!"
            })
            this.props.history.push("/")

            if (this.state.mail) {
	            cookies.set("user", this.state.mail)
                


            }
            return;
        } else {
            this.setState({
                error: "Credenciales incorrectas"
            });
            return;
        }

    }
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={(event) => this.evitarSubmit(event)}>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="email" onChange={(event) => this.controlarMail(event)} value={this.state.mail} className="form-control" id="email" placeholder="Ingresá tu email"/>
                        </div>
                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" value={this.state.password} onChange={(event) => this.controlarPassword(event)} className="form-control" id="password" placeholder="Ingresá tu contraseña"/>
                        </div>
                        {this.state.error}
                        <button onClick={() => this.onSubmit()} type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                    </form>
                    <p className="mt-3 text-center">¿No tenés cuenta? <Link to="/CrearCuenta">Registrarse</Link></p>
                </div>
            </div>
        )
    }
}

export default Login;

// funciona bien la cookie pero hay q actualizar para q desaparezcan las cosas
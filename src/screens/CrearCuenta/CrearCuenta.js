import React, { Component } from "react";

class CrearCuenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            error: "",
            todosLosMails: [],
            usuarios: [],
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

    controlarCampos() {
        let usuariosLocalStorage = localStorage.getItem("usuarios")
        let usuariosParseado = JSON.parse(usuariosLocalStorage)
        if (this.state.password.length < 6) {
            this.setState({
                error: "La contraseña debe tener al menos 6 caracteres"
            });
            return;
        }
        if (!this.state.mail.includes("@")) {
            this.setState({
                error: "El mail debe contener @"
            });
            return;
        }
        if (this.state.mail === "" || this.state.password === "") {
            this.setState({
                error: "Debes completar todos los campos"
            });
            return;
        }

        let usuario = {
            mail: this.state.mail,
            password: this.state.password
        }

        if (usuariosLocalStorage == null) {
            let arrayAEnviar = [];
            arrayAEnviar.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(arrayAEnviar))
            this.props.history.push("/Login")
        } else {
            if (usuariosParseado.find(user => user.mail === this.state.mail)) {
                this.setState({
                    error: "El mail ya existe"
                });
                return;
            }
            usuariosParseado.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuariosParseado));
            this.props.history.push("/Login");
        };
    };

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={(event) => this.evitarSubmit(event)}>
                        <div className="form-group">
                            <label>Mail:</label>
                            <input type="email" onChange={(event) => this.controlarMail(event)} value={this.state.mail} id="email" placeholder="Ingresá tu email" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" value={this.state.password} onChange={(event) => this.controlarPassword(event)} className="form-control" id="password" placeholder="Ingresá tu contraseña" />
                        </div>
                        {this.state.error}
                        <button onClick={() => this.controlarCampos()} type="submit" className="btn btn-primary btn-block">Registrarse</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CrearCuenta;
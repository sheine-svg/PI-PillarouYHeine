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

    controlarCampos = () => {
        if (this.state.password.length <= 5) {
            this.setState({
                error: "La contraseña debe tener al menos 6 caracteres"
            });
            return;
        }
        if (this.state.mail === "" || this.state.password === "") {
            this.setState({
                error: "Debes completar todos los campos"
            });
        } else {
            if (this.state.todosLosMails.includes(this.state.mail)){
                this.setState({
                    error: "El mail ya existe"
                });
                return;
            }

            let mailToString = JSON.stringify(this.state.mail)
            localStorage.setItem("mail", mailToString);
            let recuperoStorageMail = localStorage.getItem('mail');
            let mailsRecuperados = JSON.parse(recuperoStorageMail);
            this.state.todosLosMails.push(mailsRecuperados)

            let passwordToString = JSON.stringify(this.state.password)
            localStorage.setItem("password", passwordToString);
            
            this.state.usuarios.push({
                mail: this.state.mail,
                password: this.state.password,
            })
            console.log(this.state.usuarios);
            
            this.setState({
                    error: ""
                });
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={(event) => this.evitarSubmit(event)}>
                        <div className="form-group">
                            <label>Mail:</label>
                            <input type="mail" onChange={(event) => this.controlarMail(event)} value={this.state.mail} id="email" placeholder="Ingresá tu email" className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input type="password" value={this.state.password} onChange={(event) => this.controlarPassword(event)} className="form-control" id="password" placeholder="Ingresá tu contraseña"/>
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
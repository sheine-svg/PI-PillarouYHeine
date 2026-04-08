import React, {Component} from "react";
import {Link} from 'react-router-dom';
import SerieDetalle from "../SerieDetalle/SerieDetalle";

class UnaSeriePopular extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descripcion: false,
        }
    }

    mostrarMas = () => {
        this.setState({
            mostrar: !this.state.descripcion
        });
    }

    render() {
        let ver;
        let clase;
        if (this.state.descripcion == false) {
            ver = <p>Ver descripción</p>
            clase = "hide" // agregar las clases hide y show al css
        }
        else {
            ver = <p>Ocultar descripción</p>
            clase = "show"
        }

        let seccion;
        if (this.state.descripcion === true) {
            seccion = (
                <p className="card-text">{this.props.info.overview}</p>
            );
        }

        return (
            <article className='single-card-playing'>
                <img src={`https://image.tmdb.org/t/p/w342/${this.props.info.poster_path}`} alt="" className="card-img-top" />
                <div className="cardBody">
                    <h5 className="card-title">{this.props.info.title}</h5>
                    <button className='btn btn-primary' onClick={this.mostrarMas}>{ver}</button>
                    {seccion}
                    <button className='btn btn-primary' onClick={this.aparecer}>Ver más</button>
                    <a href="" class="btn alert-primary">🩶</a>
                </div>
                <Link className="" to={`/SerieDetalle/${this.props.info.id}`}>Detalle Serie</Link>
            </article>
        )
    }
}

export default UnaSeriePopular;
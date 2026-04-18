import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";

const cookies = new Cookies();

class UnaSeriePopular extends Component {

    constructor(props) {
        super(props)
        this.state = {
            descripcion: false,
            esFav: false
        }
    }

    componentDidMount () {
        let recuperoStorage = localStorage.getItem("seriesFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(this.props.info.id)) {
            this.setState({
                esFav: true
            });
        }
    }

    mostrarMas () {
        this.setState({
            descripcion: !this.state.descripcion
        });
    }

    agregarOSacarFav = () => {
        let recuperoStorage = localStorage.getItem("seriesFavs");
        let favoritos = JSON.parse(recuperoStorage) || [];

        if (favoritos.includes(this.props.info.id)) {
            let seriesFiltradas = favoritos.filter(id => id !== this.props.info.id);
            localStorage.setItem("seriesFavs", JSON.stringify(seriesFiltradas));

            this.setState({
                esFav: false
            });
        } else{
            favoritos.push(this.props.info.id);
            localStorage.setItem("seriesFavs", JSON.stringify(favoritos));

            this.setState({
                esFav: true
            });
        }
    }

    render() {
        let ver;
        let clase;

        if (this.state.descripcion == false) {
            ver = <p>Ver descripción</p>
            clase = "hide" 
        }
        else {
            ver = <p>Ocultar descripción</p>
            clase = "show card-text"
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
                    <h5 className="card-title">{this.props.info.name}</h5>
                    <button className='btn btn-primary' onClick={() => this.mostrarMas()}>{ver}</button>
                    {seccion}
                    <Link className="btn btn-primary" to={`/SerieDetalle/${this.props.info.id}`}>Detalle Serie</Link>
                    { cookies.get("user") ? 
                    (<button onClick={ () => this.agregarOSacarFav()} type="button" className="btn alert-primary">{this.state.esFav ? "❤️" : "🩶"}</button>)
                    : null }
                </div>
            </article>
        )
    }
}

export default UnaSeriePopular;
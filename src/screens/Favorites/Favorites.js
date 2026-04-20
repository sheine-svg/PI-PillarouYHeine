import React, { Component } from "react";
import UnaPeliPopular from "../../components/UnaPeliPopular/UnaPeliPopular";
import UnaSeriePopular from "../../components/UnaSeriePopular/UnaSeriePopular";
import Loader from "../../components/Loader/Loader";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelisFiltradas: [],
      seriesFiltradas: [],
      cargandoPelis: true,
      cargandoSeries: true,
    };
  }

  componentDidMount() {
    let todasLasPelis = JSON.parse(localStorage.getItem("arrayTodasLasPelis"));
    let arrayPelisFavs = JSON.parse(localStorage.getItem("pelisFavs"));

    this.setState({
      pelisFiltradas: todasLasPelis.filter(peli => arrayPelisFavs.includes(peli.id))
    });
    if (this.state.pelisFiltradas.length === 0) {
      this.setState({
        cargandoPelis: false,
      })
    }

    let todasLasSeries = JSON.parse(localStorage.getItem("arrayTodasLasSeries"));
    let arraySeriesFavs = JSON.parse(localStorage.getItem("seriesFavs"));

    this.setState({
      seriesFiltradas: todasLasSeries.filter(serie => arraySeriesFavs.includes(serie.id))
    });
    if (this.state.seriesFiltradas.length === 0) {
      this.setState({
        cargandoSeries: false,
      })
    }
  }

  render() {
    return (
      <section className="container">
        <h2 className="alert alert-primary">Peliculas Favoritas</h2>
        {this.state.cargandoPelis ? <Loader /> :
          this.state.pelisFiltradas.length === 0 ? (<p>Aún no seleccionaste ninguna película como favorita</p>) :
            (<section className="row cards">
              {this.state.pelisFiltradas.map(peli => (<UnaPeliPopular key={peli.id} info={peli} />))}
            </section>
            )}

        <h2 className="alert alert-warning">Series Favoritas</h2>
        {this.state.cargandoSeries ? <Loader /> :
          this.state.seriesFiltradas.length === 0 ? (<p>Aún no seleccionaste ninguna serie como favorita</p>) :
            (<section className="row cards">
              {this.state.seriesFiltradas.map(serie => (<UnaSeriePopular key={serie.id} info={serie} />))}
            </section>
            )}
      </section>
    )
  }
}

export default Favorites;
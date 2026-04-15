import React, { Component } from "react";
import UnaPeliPopular from "../../components/UnaPeliPopular/UnaPeliPopular";
import UnaSeriePopular from "../../components/UnaSeriePopular/UnaSeriePopular";
import Loader from "../../components/Loader/Loader";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelisFavs: [],
      seriesFavs: [],
      cargandoPelis: true,
      cargandoSeries: true
    };
  }

  componentDidMount() {
    let pelisStorage = JSON.parse(localStorage.getItem("pelisFavs")) || [];
    let seriesStorage = JSON.parse(localStorage.getItem("seriesFavs")) || [];

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey)
      .then(response => response.json())
      .then(data => {
        let pelisFiltradas = data.results.filter(peli => pelisStorage.includes(peli.id));

        this.setState({
          pelisFavs: pelisFiltradas,
          cargandoPelis: false
        })
      })
      .catch(error => console.log(error))

    fetch("https://api.themoviedb.org/3/tv/popular?api_key=" + apiKey)
      .then(response => response.json())
      .then(data => {
        let seriesFiltradas = data.results.filter(serie => seriesStorage.includes(serie.id));

        this.setState({
          seriesFavs: seriesFiltradas,
          cargandoSeries: false
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <section className="container">
        <h2 class="alert alert-primary">Peliculas Favoritas</h2>
        {this.state.cargandoPelis ? <Loader /> :
          this.state.pelisFavs.length === 0 ? (<p>Aún no seleccionaste ninguna película como favorita</p>) :
            (<section className="row cards">
              {this.state.pelisFavs.map(peli => (<UnaPeliPopular key={peli.id} info={peli} />))}
            </section>
            )}

        <h2 class="alert alert-warning">Series Favoritas</h2>
        {this.state.cargandoSeries ? <Loader /> :
          this.state.seriesFavs.length === 0 ? (<p>Aún no seleccionaste ninguna serie como favorita</p>) :
            (<section className="row cards">
              {this.state.seriesFavs.map(serie => (<UnaSeriePopular key={serie.id} info={serie} />))}
            </section>
            )}
      </section>
    );
  }
}

export default Favorites;
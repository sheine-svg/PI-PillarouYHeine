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
    };
  }

  filtrarFavoritos () {
    let todasLasPelis = JSON.parse(localStorage.getItem("arrayTodasLasPelis") || []);
    let arrayPelisFavs = JSON.parse(localStorage.getItem("pelisFavs") || []);
    this.setState ({
      pelisFiltradas: todasLasPelis.filter(peli => arrayPelisFavs.includes(peli.id))
    });
  }
/*
  componentDidMount() {
    let pelisStorage = JSON.parse(localStorage.getItem("pelisFavs")) || [];
    let seriesStorage = JSON.parse(localStorage.getItem("seriesFavs")) || [];
    let paginasPelis = Number(JSON.parse(localStorage.getItem("contadorPelis")) || 1);
    let paginasSeries = Number(JSON.parse(localStorage.getItem("contadorSeries")) || 1);
    let paginasCargadas = 1;

    for (let i = 1; i <= paginasPelis; i++) {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${i}`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            todasLasPelis: this.state.todasLasPelis.concat(data.results),
          });

          let paginasCargadas = paginasCargadas + 1;

          if (paginasCargadas === paginasPelis) {
            this.setState({
              pelisFiltradas: this.state.todasLasPelis.filter(peli => pelisStorage.includes(peli.id)),
            })
          }

          this.setState({
            pelisFavs: this.state.pelisFiltradas,
            cargandoPelis: false,
          });
        })
        .catch(error => console.log(error));
    }

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${paginasPelis}`)
      .then(response => response.json())
      .then(data => {
        let pelisFiltradas = data.results.filter(peli => pelisStorage.includes(peli.id));

        this.setState({
          pelisFavs: pelisFiltradas,
          cargandoPelis: false
        })
      })
      .catch(error => console.log(error));
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${paginasSeries}`)
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
 */
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
import { useState, useEffect } from "react";
import UnaPeliPopular from "../../components/UnaPeliPopular/UnaPeliPopular";
import UnaSeriePopular from "../../components/UnaSeriePopular/UnaSeriePopular";
import Loader from "../../components/Loader/Loader";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

function Favorites(props) {
  const [pelisFiltradas, setPelisFiltradas] = useState([]);
  const [seriesFiltradas, setSeriesFiltradas] = useState([]);
  const [cargandoPelis, setCargandoPelis] = useState(true);
  const [cargandoSeries, setCargandoSeries] = useState(true);

  useEffect(() => {
    let arrayPelisFavs = JSON.parse(localStorage.getItem("pelisFavs"));
    let arraySeriesFavs = JSON.parse(localStorage.getItem("seriesFavs"));

    if (arrayPelisFavs) {
      let arrayVacio = [];

      arrayPelisFavs.map(id => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            arrayVacio.push(data)
            setPelisFiltradas(arrayVacio)
          })
          .catch(error => console.log(error))
      })
      setCargandoPelis(false)
    }

    if (arraySeriesFavs) {
      let arrayVacio = [];

      arraySeriesFavs.map(id => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            arrayVacio.push(data)
            setSeriesFiltradas(arrayVacio)
          })
          .catch(error => console.log(error))
      })
      setCargandoSeries(false)
    }
  }, [])

  return (
    <section className="container">
      <h2 className="alert alert-primary">Peliculas Favoritas</h2>
      {cargandoPelis ? <Loader /> :
        pelisFiltradas.length === 0 ? (<p className="textoSinFav">Aún no seleccionaste ninguna película como favorita</p>) :
          (<section className="row cards">
            {pelisFiltradas.map(peli => (<UnaPeliPopular key={peli.id} info={peli} />))}
          </section>
          )}

      <h2 className="alert alert-warning">Series Favoritas</h2>
      {cargandoSeries ? <Loader /> :
        seriesFiltradas.length === 0 ? (<p className="textoSinFav">Aún no seleccionaste ninguna serie como favorita</p>) :
          (<section className="row cards">
            {seriesFiltradas.map(serie => (<UnaSeriePopular key={serie.id} info={serie} />))}
          </section>
          )}
    </section>
  )
}

export default Favorites;
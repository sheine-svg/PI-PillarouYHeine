import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import SerieDetalle from "./screens/SerieDetalle/SerieDetalle";
import PeliculaDetalle from "./screens/PeliculaDetalle/PeliculaDetalle";
import CrearCuenta from "./screens/CrearCuenta/CrearCuenta";
import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
import Favorites from "./screens/Favorites/Favorites";
import TodaslasPelis from "./screens/TodaslasPelis/TodaslasPelis";
import TodasLasSeries from "./screens/TodasLasSeries/TodasLasSeries";
import ResultadosBusqueda from "./screens/ResultadosBusqueda/ResultadosBusqueda";
import {Route, Switch} from "react-router-dom";

function App() {
  return (
      <div className="container">
        <h1>UdeSA Movies</h1>
        <Navbar />

        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/Login" component={Login}/>
          <Route path="/CrearCuenta" component={CrearCuenta}/>
          <Route path="/PeliculaDetalle/:id" component={PeliculaDetalle} />
          <Route path="/SerieDetalle/:id" component={SerieDetalle} />
          <Route path="/Favorites" component={Favorites} />
          <Route path="/TodaslasPelis" component={TodaslasPelis} />
          <Route path="/TodasLasSeries" component={TodasLasSeries} />
          <Route path="/ResultadosBusqueda/:busqueda/:tipo" component={ResultadosBusqueda} />
          <Route path="*" component={NotFound}/>
        </Switch>

        <Footer />
      </div>
  );
}

export default App;
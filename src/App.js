import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Buscador from "./components/Buscador/Buscador";
import SectionPopular from "./components/SectionPopular/SectionPopular";
import SectionSerie from "./components/sectionSerie/sectionSerie";
import NotFound from "./components/NotFound/NotFound";
import SerieDetalle from "./components/SerieDetalle/SerieDetalle";
import PeliculaDetalle from "./components/PeliculaDetalle/PeliculaDetalle";
import CrearCuenta from "./screens/CrearCuenta/CrearCuenta";
import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
import Favorites from "./screens/Favorites/Favorites";
import {Route, Switch} from "react-router-dom";

function App() {
  return (
    <body>
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
          <Route path="*" component={NotFound}/>
        </Switch>

        <Buscador />

        <h2 class="alert alert-primary">Popular movies</h2>
        <SectionPopular />

        <h2 class="alert alert-primary">Popular series</h2>
        <SectionSerie />
        <Footer />
      </div>
    </body>
  );
}

export default App;
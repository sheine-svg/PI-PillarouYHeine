import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Buscador from "./components/Buscador/Buscador";

function Favorites() {
  return (
    <body>
      <div className="container">
        <h1>UdeSA Movies</h1>
        
        <Header />

        <Buscador />

        <Footer />
      </div>
    </body>
  );
}

export default Favorites;
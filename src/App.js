import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Buscador from "./components/Buscador/Buscador";
import SectionPopular from "./components/SectionPopular/SectionPopular";
import SectionSerie from "./components/sectionSerie/sectionSerie";

function App() {
  return (
    <body>
      <div className="container">
        <h1>UdeSA Movies</h1>
        
        <Header />

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
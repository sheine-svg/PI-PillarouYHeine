import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Buscador from "./components/Buscador/Buscador";
import SectionPopular from "./components/SectionPopular/SectionPopular";
import SectionPlaying from "./components/sectionPlaying/sectionPlaying";
import SectionPopularShows from "./components/SectionPopularShows/SectionPopularShows";
import SectionShowsAiring from "./components/SectionShowsAiring/SectionShowsAiring";

function App() {
  return (
    <body>
      <div className="container">
        <h1>UdeSA Movies</h1>
        
        <Header />

        <Buscador />

        <h2 class="alert alert-primary">Popular movies this week</h2>
        <SectionPopular />

        <h2 class="alert alert-primary">Movies now playing</h2>
        <SectionPlaying />

        <h2 class="alert alert-warning">Popular TV shows this week</h2>
        <SectionPopularShows/>

        <h2 class="alert alert-warning">TV shows airing today</h2>
        <SectionShowsAiring/>

        <Footer />
      </div>
    </body>
  );
}

export default App;
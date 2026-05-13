import { useState, useEffect } from "react";
import UnaPeliPopular from "../UnaPeliPopular/UnaPeliPopular";
import Loader from "../Loader/Loader";
import { Link } from 'react-router-dom';

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

function SectionPopular(props){
    const [arrayPeliculasPopulares, setArrayPeliculasPopulares] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey)
            .then(response => response.json())
            .then(data => setArrayPeliculasPopulares(data.results.slice(0, 4)))
            .catch(error => console.log(error))
    }, [])

    return (
            <section className='row cards' id="movies">
                {arrayPeliculasPopulares.length === 0 ?
                    <Loader /> :
                    arrayPeliculasPopulares.map(peli => <UnaPeliPopular key={peli.id} info={peli} />)
                }
                <Link id="todas" className="btn btn-primary" to={`/TodaslasPelis`}>Ver todas las películas</Link>
            </section>
        )
}

export default SectionPopular;
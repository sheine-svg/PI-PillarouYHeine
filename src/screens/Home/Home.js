import React from "react";
import SectionPopular from "../../components/SectionPopular/SectionPopular";
import SectionSerie from "../../components/sectionSerie/sectionSerie";
import Buscador from "../../components/Buscador/Buscador";

function Home() {
    return (
        <div>
            <Buscador />

            <h2 className="alert alert-primary">Popular movies</h2>
            <SectionPopular />

            <h2 className="alert alert-primary">Popular series</h2>
            <SectionSerie />
        </div>
    )
}

export default Home;
import React from "react";
import UnaPeliPopular from "../UnaPeliPopular/UnaPeliPopular";

function SectionPopular() {
    return (
        <section class="row cards" id="movies">
            <UnaPeliPopular/>
            <UnaPeliPopular/>
            <UnaPeliPopular/>
            <UnaPeliPopular/>
        </section>
    );
}

export default SectionPopular;
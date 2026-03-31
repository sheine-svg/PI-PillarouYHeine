import React from "react"
import UnPopularShow from "../UnPopularShow/UnPopularShow";

function SectionPopularShows(){
    return(
        <section class="row cards" id="tv-show">
            <UnPopularShow/>
            <UnPopularShow/>
            <UnPopularShow/>
            <UnPopularShow/>
        </section>
    );
}

export default SectionPopularShows;
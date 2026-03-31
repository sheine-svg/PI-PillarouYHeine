import React from "react";
import UnShowAiring from "../UnShowAiring/UnShowAiring";

function SectionShowsAiring() {
    return (
        <section class="row cards" id="on-air-today">
            <UnShowAiring/>
            <UnShowAiring/>
            <UnShowAiring/>
            <UnShowAiring/>
        </section>
    );
}

export default SectionShowsAiring;
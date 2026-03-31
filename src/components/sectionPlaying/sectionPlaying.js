import React from "react";
import UnaMoviePlaying from "../UnaMoviePlaying/UnaMoviePlaying";

function SectionPlaying() {
    return (
        <section class="row cards" id="now-playing">
            <UnaMoviePlaying/>
            <UnaMoviePlaying/>
            <UnaMoviePlaying/>
            <UnaMoviePlaying/>
        </section>
    );
}

export default SectionPlaying;
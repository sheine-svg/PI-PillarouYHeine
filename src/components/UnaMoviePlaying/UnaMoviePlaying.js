import React from "react";

function UnaMoviePlaying() {
    return (
        <article class="single-card-playing">
            <img src="https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg" class="card-img-top"
                alt="..." />
            <div class="cardBody">
                <h5 class="card-title">War of the Worlds</h5>
                <p class="card-text">Will Radford is a top analyst for Homeland Security who tracks potential
                    threats through a mass surveillance program, until one day an attack by an unknown entity leads
                    him to question whether the government is hiding something from him... and from the rest of the
                    world.</p>
                <a href="movie.html" class="btn btn-primary">Ver más</a>
                <a href="" class="btn alert-primary">🩶</a>
            </div>
        </article>
    );
}

export default UnaMoviePlaying;
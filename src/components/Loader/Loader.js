import React from "react";

function Loader() {
    return (
        <div className="loaderContainer">
            <img src="/img/loading-25.gif" alt="Cargando..." className="loaderGif"/>
            <p>Cargando...</p>
        </div>
    );
}

export default Loader;
import React from "react";
import {Link} from "react-router-dom";

function NotFound(){
    return(
        <div className="divNotFound">
            <p className="mjeError">ERROR 404</p>
            <p>Ups! La página no se ha encontrado</p>
            <Link className="btn btn-primary" to={`/`}>Volver a Home</Link>
        </div>
    )
}

export default NotFound;
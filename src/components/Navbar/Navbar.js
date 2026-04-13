import React from "react";
import Header from "../Header/Header";

function Navbar () {
    let menues =  [
        {
            route: "/",
            name: "Home"
        },
        {
            route: "/TodaslasPelis",
            name: "Películas"
        },
        {
            route: "/TodasLasSeries",
            name: "Series"
        },
        {
            route: "/Favoritos",
            name: "Favoritos"
        },
        {
            route: "/Login",
            name: "Login"
        },
        {
            route: "/CrearCuenta",
            name: "Crear Cuenta"
        }
    ];
    return (
        <Header menu={menues}/>
    )}

export default Navbar;
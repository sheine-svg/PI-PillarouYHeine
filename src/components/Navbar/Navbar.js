import React from "react";
import Header from "../Header/Header";

function Navbar () {
    let menues =  [
        {
            route: "/",
            name: "Home"
        },
        {
            route: "/Login",
            name: "Login"
        },
        {
            route: "/CrearCuenta",
            name: "Crear Cuenta"
        },
        {
            route: "/Favoritos",
            name: "Favoritos"
        }
    ];
    return (
        <Header menu={menues}/>
    )}

export default Navbar;
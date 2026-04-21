import React from "react";
import Header from "../Header/Header";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Navbar() {
    let usuarioLogueado = cookies.get("user")

    let menues = [
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
        }
    ];
    if (usuarioLogueado) {
        menues.push(
            {
                route: "/Favorites",
                name: "Favoritos"
            },
            {
                route: "/Logout",
                name: "Logout"
            }
        );
    } else {
        menues.push(
            {
                route: "/Login",
                name: "Login"
            },
            {
                route: "/CrearCuenta",
                name: "Crear Cuenta"
            }
        )
    };

    return (
        <Header menu={menues} />
    )
}

export default Navbar;
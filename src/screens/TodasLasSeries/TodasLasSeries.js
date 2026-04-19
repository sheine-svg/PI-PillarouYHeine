import React, { Component } from "react";
import UnaSeriePopular from "../../components/UnaSeriePopular/UnaSeriePopular";
import Loader from "../../components/Loader/Loader";

const apiKey = "ca76634b9f3c10dbf49b0d77c7b2db49";

class TodasLasSeries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arraySeriesPopulares: [],
            contador: 1,
            buscarSerie: "",
            arraySeriesPopularesCopia: [],
        }
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=" + apiKey)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    arraySeriesPopulares: data.results,
                    arraySeriesPopularesCopia: data.results
                }
            ))
            .catch(error => console.log(error))
    }

    cargarMasSeries() {
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${this.state.contador + 1}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    arraySeriesPopulares: this.state.arraySeriesPopulares.concat(data.results),
                    arraySeriesPopularesCopia: this.state.arraySeriesPopularesCopia.concat(data.results),
                    contador: this.state.contador + 1,
                });
                localStorage.setItem("contadorSeries", JSON.stringify(this.state.contador + 1));
            })
            .catch(error => console.log(error))
    }

    evitarSubmit(event) {
        event.preventDefault();
    }

    controlarCambios(event) {
        this.setState({ buscarSerie: event.target.value });

        if (this.state.buscarSerie != "") {
            let seriesFiltradas = this.state.arraySeriesPopularesCopia.filter(serie =>
                serie.name.toLowerCase().includes(this.state.buscarSerie.toLowerCase()));

            this.setState({
                arraySeriesPopulares: seriesFiltradas
            })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.evitarSubmit(event)}>
                    <label>Buscar una serie</label>
                    <input type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.buscarSerie}></input>
                </form>

                <h2 className="alert alert-primary">Todas las series populares</h2>
                <section className='row cards' id="now-playing">
                    {this.state.arraySeriesPopulares.length === 0 ?
                        <Loader /> :
                        this.state.arraySeriesPopulares.map(serie => <UnaSeriePopular key={serie.id} info={serie} />)
                    }
                </section>

                <section>
                    <button className="btn btn-primary" onClick={() => this.cargarMasSeries()}>Más series</button>
                </section>
            </div>
        )
    }
}

export default TodasLasSeries;
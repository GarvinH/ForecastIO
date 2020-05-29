import React from 'react'
import WeatherContext from '../../context/WeatherContext'
import './Banner.css'
import { Jumbotron, Form } from 'react-bootstrap'
import { weatherMode, searchMode } from '../../enums'

interface State {
    readonly city: string;
    readonly coord: [string, string];
}

class Banner extends React.Component {
    state: State = {
        city: "",
        coord: ["", ""]
    }

    titleDecider = (weatherMethod: weatherMode) => {
        switch (weatherMethod) {
            case (weatherMode.forecast):
                return "5 Day Forecast"
            case (weatherMode.current):
                return "Current"
        }
    }

    cityTextChanged = (city: string) => {
        this.setState({ city: city })
    }

    coordTextChanged = (index: number, value: string) => {
        const newCoord = [...this.state.coord]
        newCoord[index] = value
        this.setState({ coord: newCoord })
    }

    formDecider = (searchMethod: searchMode) => {
        switch (searchMethod) {
            case (searchMode.city):
                return (<Form.Group>
                    <Form.Control id="city" type="text" placeholder="City Name"
                        aria-label="Enter city name" value={this.state.city}
                        onChange={(event) => this.cityTextChanged(event.target.value)} />
                </Form.Group>)
            case (searchMode.coord):
                return (<Form.Group>
                    <Form.Control type="text" placeholder="Latitude" aria-label="Enter latitude"
                        value={this.state.coord[0]}
                        onChange={(event) => this.coordTextChanged(0, event.target.value)} />
                    <Form.Control type="text" placeholder="Longitude" aria-label="Enter longitude"
                        value={this.state.coord[1]}
                        onChange={(event) => this.coordTextChanged(1, event.target.value)} />
                </Form.Group>)
        }
    }

    searchChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        switch (event.target.value) {
            case ("city"):
                this.context.changeSearchMode(searchMode.city)
                break;
            case ("coord"):
                this.context.changeSearchMode(searchMode.coord)
                break;
        }
    }

    formSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        this.context.cityChanged(this.state.city)
        this.context.coordChanged(this.state.coord)
    }

    render() {

        const title = this.titleDecider(this.context.weatherMode)
        const form = this.formDecider(this.context.searchMode)

        return (
            <Jumbotron>
                <h1 className="display-2">{title}</h1>
                <h1 className="display-4 text-muted">{this.context.city}</h1>
                <Form onSubmit={this.formSubmit}>
                    <Form.Group>
                        <Form.Label aria-label="Select search method">Search by:</Form.Label>
                        <Form.Control as="select" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.searchChanged(event)}>
                            <option value="city" aria-label="Search by city">City</option>
                            <option value="coord" aria-label="Search by coordinates">Coordinates</option>
                        </Form.Control>
                    </Form.Group>
                    {form}

                </Form>
            </Jumbotron>
        )
    }
}

Banner.contextType = WeatherContext

export default Banner;
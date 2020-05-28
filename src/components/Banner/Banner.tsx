import React from 'react'
import WeatherContext from '../../context/WeatherContext'
import './Banner.css'
import { Jumbotron, Form } from 'react-bootstrap'
import { weatherMode, searchMode } from '../../enums'

class Banner extends React.Component {

    titleDecider = (weatherMethod: weatherMode) => {
        switch (weatherMethod) {
            case (weatherMode.forecast):
                return "5 Day Forecast"
            case (weatherMode.current):
                return "Current"
        }
    }

    formDecider = (searchMethod: searchMode) => {
        switch (searchMethod) {
            case (searchMode.city):
                return (<Form.Group>
                    <Form.Control id="city" type="text" placeholder="City Name" 
                    aria-label="Enter city name" value={this.context.city} 
                    onChange={(event) => this.context.cityChanged(event.target.value)}/>
                </Form.Group>)
            case (searchMode.coord):
                return (<Form.Group>
                    <Form.Control type="text" placeholder="Latitude" aria-label="Enter latitude"
                    value={this.context.coord[0]} 
                    onChange={(event) => this.context.coordChanged(0, event.target.value)} />
                    <Form.Control type="text" placeholder="Longitude" aria-label="Enter longitude" 
                    value={this.context.coord[1]} 
                    onChange={(event) => this.context.coordChanged(1, event.target.value)}/>
                </Form.Group>)
        }
    }

    searchChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        switch(event.target.value) {
            case("city"):
                this.context.changeSearchMode(searchMode.city)
                break;
            case("coord"):
                this.context.changeSearchMode(searchMode.coord)
                break;
        }
    }

    render() {

        const title = this.titleDecider(this.context.weatherMode)
        const form = this.formDecider(this.context.searchMode)

        return (
            <Jumbotron>
                <h1 className="display-2">{title}</h1>
                <h1 className="display-4 text-muted">Toronto</h1>
                <Form >
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
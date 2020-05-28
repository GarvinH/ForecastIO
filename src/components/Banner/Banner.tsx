import React, { useContext } from 'react'
import WeatherContext from '../../context/WeatherContext'
import './Banner.css'
import { Jumbotron, Form } from 'react-bootstrap'
import { weatherMode } from '../../enums'


const titleDecider = (weatherMethod: weatherMode) => {
    console.log(weatherMethod)
    switch (weatherMethod) {
        case (weatherMode.forecast):
            return "5 Day Forecast"
        case (weatherMode.current):
            return "Current"
    }
}

const Banner: React.FC = () => {
    const context = useContext(WeatherContext)

    const title = titleDecider(context.weatherMode)

    return (
        <Jumbotron>
            <h1 className="display-2">{title}</h1>
            <h1 className="display-4 text-muted">Toronto</h1>
            <Form >
                <Form.Group>
                    <Form.Label aria-label="Select search method">Search by:</Form.Label>
                    <Form.Control as="select" >
                        <option value="city" aria-label="Search by city">City</option>
                        <option value="coord" aria-label="Search by coordinates">Coordinates</option>
                    </Form.Control>
                </Form.Group>

            </Form>
        </Jumbotron>
    )
}

export default Banner;
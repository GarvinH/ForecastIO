import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './Navigation.css'
import WeatherContext from '../../context/WeatherContext'
import { weatherMode } from '../../enums'

type PathParams = {
    path: string;
}

type Props = RouteComponentProps<PathParams>;

const forecastClicked = (history: RouteComponentProps["history"]): void => {
    history.replace("/forecast")
}

const currentClicked = (history: RouteComponentProps["history"]): void => {
    history.replace("/current")
}


const Navigation: React.FC<Props> = (props) => {
    const context = useContext(WeatherContext)
    console.log(typeof context)
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>Forecast.IO</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link onClick={() => {forecastClicked(props.history); context.changeWeatherMode(weatherMode.forecast)}}>
                        5 Days
                </Nav.Link>
                    <Nav.Link onClick={() => {currentClicked(props.history); context.changeWeatherMode(weatherMode.current)}}>
                        Current
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation)
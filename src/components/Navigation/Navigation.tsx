import React from 'react'
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


class Navigation extends React.Component<Props> {
    
    forecastClicked = (history: RouteComponentProps["history"]): void => {
        this.context.changeWeatherMode(weatherMode.forecast)
        history.replace("/forecast")
    }
    
    currentClicked = (history: RouteComponentProps["history"]): void => {
        this.context.changeWeatherMode(weatherMode.current)
        history.replace("/current")
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>Forecast.IO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link onClick={() => this.forecastClicked(this.props.history)}>
                            5 Days
                </Nav.Link>
                        <Nav.Link onClick={() => this.currentClicked(this.props.history)}>
                            Current
                </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

Navigation.contextType = WeatherContext


export default withRouter(Navigation)
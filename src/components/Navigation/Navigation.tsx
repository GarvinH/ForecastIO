import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './Navigation.css'

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


const Navigation: React.FC<Props> = (props) => (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Forecast.IO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link onClick={() => forecastClicked(props.history)}>
                        5 Days
                </Nav.Link>
                <Nav.Link onClick={() => currentClicked(props.history)}>
                        Current
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default withRouter(Navigation)
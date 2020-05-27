import React from 'react'
import './Banner.css'
import { Jumbotron, Form } from 'react-bootstrap'

interface Props {
    title: string
    city: string
}

const Banner: React.FC<Props> = ({ title, city }: Props) => {


    return (
    <Jumbotron>
        <h1 className="display-2">{title}</h1>
        <h1 className="display-4 text-muted">{city}</h1>
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
)}

export default Banner;
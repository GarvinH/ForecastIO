import React from 'react'
import { Card } from 'react-bootstrap'

interface Props {
    dateTimestamp: number,
    weatherInfo: string,
    timezone: number
}

const WeatherCard: React.FC<Props> = ({dateTimestamp, weatherInfo}: Props) => {


    return (
    <Card className="col-lg-2">
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
    </Card>
)}

export default WeatherCard
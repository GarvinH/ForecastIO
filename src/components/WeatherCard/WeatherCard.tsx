import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { getDayString, getMonthString, getHourString, timestampToAdjustedDate } from '../../DateResolver/DateResolver'

interface Props {
    dateTimestamp: number,
    weatherInfo: any,
    timezone: number,
    temp: string
}

const WeatherCard: React.FC<Props> = ({ dateTimestamp, weatherInfo, timezone, temp }: Props) => {
    const localDate = timestampToAdjustedDate(dateTimestamp, timezone)

    return (
        <Container>
            <Card style={{ textAlign: "center" }}>
                <Card.Body>
                    <Card.Title>{getDayString(localDate.getUTCDay())}</Card.Title>
                    <Card.Text>{getHourString(localDate.getUTCHours())}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">{getMonthString(localDate.getUTCMonth()) + " " + localDate.getUTCDate()}</Card.Subtitle>
                    <Card.Img src={"http://openweathermap.org/img/wn/" + weatherInfo[0].icon + "@2x.png"} alt={weatherInfo[0].main} />
                    <Card.Title>{temp}</Card.Title>
                    <Card.Text style={{textTransform:"capitalize"}}>{weatherInfo[0].description}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default WeatherCard
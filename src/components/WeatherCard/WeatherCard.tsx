import React from 'react'
import { Card } from 'react-bootstrap'
import { getDayString, getMonthString, timestampToTimeString, timestampToAdjustedDate } from '../../Resolvers/DateResolver/DateResolver'

interface Props {
    dateTimestamp: number,
    weatherInfo: any,
    timezone: number,
    temp: string
    clicked?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const WeatherCard: React.FC<Props> = ({ dateTimestamp, weatherInfo, timezone, temp, clicked }: Props) => {
    const localDate = timestampToAdjustedDate(dateTimestamp, timezone)

    return (
        <Card style={{ textAlign: "center" }}>
            <button style={{ background: "none", border: "none" }} onClick={clicked || undefined}>
                <Card.Body>
                    <Card.Title>{getDayString(localDate.getUTCDay())}</Card.Title>
                    <Card.Text>{timestampToTimeString(dateTimestamp, timezone)}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">{getMonthString(localDate.getUTCMonth()) + " " + localDate.getUTCDate()}</Card.Subtitle>
                    <Card.Img src={"http://openweathermap.org/img/wn/" + weatherInfo[0].icon + "@2x.png"} alt={weatherInfo[0].main} />
                    <Card.Title>{temp}</Card.Title>
                    <Card.Text style={{ textTransform: "capitalize" }}>{weatherInfo[0].description}</Card.Text>
                </Card.Body>
            </button>
        </Card>
    )
}

export default WeatherCard
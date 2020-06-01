import React from 'react'
import WeatherCard from '../WeatherCard/WeatherCard'
import { Row, Jumbotron, Container, Col, Badge } from 'react-bootstrap'
import { getTemperature, getSpeed, angleToDirection, getVolume } from '../../Resolvers/UnitResolver/UnitResolver'
import { measurementSys } from '../../enums'

interface Props {
    forecast: any;// from the list object that open weather map api returns
    timezone: number;
    measureSys: measurementSys
}

const DetailedForecast: React.FC<Props> = ({ forecast, timezone, measureSys }: Props) => {
    const feelsLike = forecast.main !== undefined ? (forecast.main.feels_like !== undefined ? <h4>Feels like: <Badge variant="primary">{getTemperature(forecast.main.feels_like, measureSys)}</Badge></h4> : null) : null
    const humidity = forecast.main !== undefined ? (forecast.main.humidity !== undefined ? <h4>Humidity: <Badge variant="secondary">{forecast.main.humidity}%</Badge></h4> : null) : null
    const cloudiness = forecast.clouds !== undefined ? (forecast.clouds.all !== undefined ? <h4>Cloudiness: <Badge variant="secondary">{forecast.clouds.all}%</Badge></h4> : null) : null

    const windSpeed = forecast.wind !== undefined ? (forecast.wind.speed !== undefined ? getSpeed(forecast.wind.speed, measureSys) : "") : ""
    const windDirection = forecast.wind !== undefined ? (forecast.wind.deg !== undefined ? angleToDirection(forecast.wind.deg) : "") : ""
    const windVelocity = windSpeed + windDirection
    const wind = windVelocity !== "" ? <h4>Wind: <Badge variant="secondary">{windVelocity}</Badge></h4> : null

    const rain = forecast.rain !== undefined ? (forecast.rain["3h"] !== undefined ? <h4>Rain: <Badge variant="secondary">{getVolume(forecast.rain["3h"], measureSys)}</Badge></h4> : null) : null
    const snow = forecast.snow !== undefined ? (forecast.snow["3h"] !== undefined ? <h4>Rain: <Badge variant="secondary">{getVolume(forecast.snow["3h"], measureSys)}</Badge></h4> : null) : null
    return (
        <Container>
            <Jumbotron fluid className="col-6 offset-3">
                <Row className="m-auto justify-content-center">
                    <WeatherCard dateTimestamp={forecast.dt} temp={getTemperature(forecast.main.temp, measureSys)} timezone={timezone}
                        weatherInfo={forecast.weather} />
                    <Col className="justify-content-center align-self-center col-6">
                        {feelsLike}
                        {humidity}
                        {cloudiness}
                        {wind}
                        {rain}
                        {snow}
                    </Col>
                </Row>
            </Jumbotron>
        </Container>
    )
}

export default DetailedForecast
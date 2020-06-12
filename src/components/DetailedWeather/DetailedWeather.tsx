import React from 'react'
import WeatherCard from '../WeatherCard/WeatherCard'
import { Row, Jumbotron, Container, Col, Badge } from 'react-bootstrap'
import { getTemperature, getSpeed, angleToDirection, getVolume, getDistance } from '../../Resolvers/UnitResolver/UnitResolver'
import { timestampToTimeString } from '../../Resolvers/DateResolver/DateResolver'
import { measurementSys } from '../../enums'

interface Props {
    weather: any;// from the list object that open weather map api returns
    timezone: number;
    measureSys: measurementSys
}

const DetailedWeather: React.FC<Props> = ({ weather, timezone, measureSys }: Props) => {
    const feelsLike = (weather.main && weather.main.feels_like) ? <h4>Feels like: <Badge variant="primary">{getTemperature(weather.main.feels_like, measureSys)}</Badge></h4> : null
    const humidity = (weather.main && weather.main.humidity) ? <h4>Humidity: <Badge variant="secondary">{weather.main.humidity}%</Badge></h4> : null
    const cloudiness = weather.clouds && weather.clouds.all ? <h4>Cloudiness: <Badge variant="secondary">{weather.clouds.all}%</Badge></h4> : null

    const windSpeed = (weather.wind && weather.wind.speed) ? getSpeed(weather.wind.speed, measureSys) : ""
    const windDirection = (weather.wind && weather.wind.deg) ? angleToDirection(weather.wind.deg) : ""
    const windVelocity = windSpeed + windDirection
    const wind = windVelocity !== "" ? <h4>Wind: <Badge variant="secondary">{windVelocity}</Badge></h4> : null

    const rain = (weather.rain && weather.rain["3h"]) ? <h4>Rain: <Badge variant="secondary">{getVolume(weather.rain["3h"], measureSys)}</Badge></h4> : null
    const snow = (weather.snow && weather.snow["3h"]) ? <h4>Rain: <Badge variant="secondary">{getVolume(weather.snow["3h"], measureSys)}</Badge></h4> : null

    const visibility = weather.visibility ? <h4>Visibility: <Badge variant="secondary">{getDistance(weather.visibility, measureSys)}</Badge></h4> : null
    
    const sunrise = (weather.sys && weather.sys.sunrise) ? <h4>Sunrise: <Badge variant="secondary">{timestampToTimeString(weather.sys.sunrise, timezone)}</Badge></h4> : null
    const sunset = (weather.sys && weather.sys.sunset) ? <h4>Sunset: <Badge variant="secondary">{timestampToTimeString(weather.sys.sunset, timezone)}</Badge></h4> : null
    
    return (
        <Container>
            <Jumbotron fluid className="col-6 offset-3">
                <Row className="m-auto justify-content-center">
                    <WeatherCard dateTimestamp={weather.dt} temp={getTemperature(weather.main.temp, measureSys)} timezone={timezone}
                        weatherInfo={weather.weather} />
                    <Col className="justify-content-center align-self-center col-6">
                        {feelsLike}
                        {humidity}
                        {cloudiness}
                        {wind}
                        {rain}
                        {snow}
                        {visibility}
                        {sunrise}
                        {sunset}
                    </Col>
                </Row>
            </Jumbotron>
        </Container>
    )
}

export default DetailedWeather
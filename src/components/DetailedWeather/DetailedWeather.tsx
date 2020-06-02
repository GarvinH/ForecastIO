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
    const feelsLike = weather.main !== undefined ? (weather.main.feels_like !== undefined ? <h4>Feels like: <Badge variant="primary">{getTemperature(weather.main.feels_like, measureSys)}</Badge></h4> : null) : null
    const humidity = weather.main !== undefined ? (weather.main.humidity !== undefined ? <h4>Humidity: <Badge variant="secondary">{weather.main.humidity}%</Badge></h4> : null) : null
    const cloudiness = weather.clouds !== undefined ? (weather.clouds.all !== undefined ? <h4>Cloudiness: <Badge variant="secondary">{weather.clouds.all}%</Badge></h4> : null) : null

    const windSpeed = weather.wind !== undefined ? (weather.wind.speed !== undefined ? getSpeed(weather.wind.speed, measureSys) : "") : ""
    const windDirection = weather.wind !== undefined ? (weather.wind.deg !== undefined ? angleToDirection(weather.wind.deg) : "") : ""
    const windVelocity = windSpeed + windDirection
    const wind = windVelocity !== "" ? <h4>Wind: <Badge variant="secondary">{windVelocity}</Badge></h4> : null

    const rain = weather.rain !== undefined ? (weather.rain["3h"] !== undefined ? <h4>Rain: <Badge variant="secondary">{getVolume(weather.rain["3h"], measureSys)}</Badge></h4> : null) : null
    const snow = weather.snow !== undefined ? (weather.snow["3h"] !== undefined ? <h4>Rain: <Badge variant="secondary">{getVolume(weather.snow["3h"], measureSys)}</Badge></h4> : null) : null

    const visibility = weather.visibility !== undefined ? <h4>Visibility: <Badge variant="secondary">{getDistance(weather.visibility, measureSys)}</Badge></h4> : null
    
    const sunrise = weather.sys !== undefined? (weather.sys.sunrise !== undefined? <h4>Sunrise: <Badge variant="secondary">{timestampToTimeString(weather.sys.sunrise, timezone)}</Badge></h4>:null) : null
    const sunset = weather.sys !== undefined? (weather.sys.sunset !== undefined? <h4>Sunset: <Badge variant="secondary">{timestampToTimeString(weather.sys.sunset, timezone)}</Badge></h4>:null) : null
    
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
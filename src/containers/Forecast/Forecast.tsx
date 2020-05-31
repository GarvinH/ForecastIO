import React from 'react'
import axios from 'axios'
import { searchMode } from '../../enums'
import { Container, Row, Col } from 'react-bootstrap'
import WeatherCard from '../../components/WeatherCard/WeatherCard'
import { timestampToAdjustedDate } from '../../DateResolver/DateResolver'
import { measurementSys } from '../../enums'
import ArrowButton, { Direction } from '../../components/UI/ArrowButton/ArrowButton'

interface Props {
    searchMethod: searchMode,
    city: string,
    coord: [string, string],
    measureSys: measurementSys
}

interface State {
    code: number | null;
    message: string | null;
    forecast: Array<Array<any>>;
    cityInfo: any;
    forecastIndex: Array<number>;
}

class Forecast extends React.Component<Props> {
    state: State = {
        code: null,
        message: null,
        forecast: new Array<Array<any>>(5),
        cityInfo: {},
        forecastIndex: new Array<number>(5)
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.city !== prevProps.city || this.props.coord !== prevProps.coord) {
            this.getForecast()
        }
        //console.log(this.state)
    }

    getForecast = () => {
        const url = "https://forecast-io-server.herokuapp.com/forecast" + this.getSearchPath()
        axios.get(url).then(res => {
            const data = res.data

            const code = parseInt(data.cod)
            const cityInfo = data.city
            const forecast: Array<Array<any>> = [[], [], [], [], []]

            var index: number = -1
            var lastDate: number = 0;
            for (let weatherData of data.list) {
                const date = timestampToAdjustedDate(weatherData.dt, cityInfo.timezone).getUTCDate()
                if (lastDate !== date) {
                    index++;
                    lastDate = date
                }
                if (index === 5) {
                    break;
                }
                forecast[index].push(weatherData)
            }

            const forecastIndex = forecast.map((day, index) => {
                if (index === 0) {
                    return 0;
                }

                var hourlyIndex = 0
                for (let hourForecast of day) {
                    const date = timestampToAdjustedDate(hourForecast.dt, cityInfo.timezone)
                    if (date.getUTCHours() >= 11) {
                        return hourlyIndex
                    }
                    hourlyIndex++;
                }

                return 0
            })

            this.setState({ code: code, forecast: forecast, cityInfo: cityInfo, forecastIndex: forecastIndex })
        }).catch(err => {
            console.log(err)
            this.setState({ code: err.cod, message: err.message })
        })
    }

    getSearchPath = () => {
        switch (this.props.searchMethod) {
            case (searchMode.city):
                return "/city?city=" + this.props.city
            case (searchMode.coord):
                return "/coord?lat=" + this.props.coord[0] + "&lon=" + this.props.coord[1]
        }
    }

    getTemperature = (temp: number): string => {
        switch (Number(this.props.measureSys)) {
            case (measurementSys.Kelvin):
                return temp.toFixed(1) + " K"
            case (measurementSys.Celcius):
                return (temp - 273.15).toFixed(1) + " °C"
            case (measurementSys.Fahrenheit):
                return ((temp - 273.15) * 9 / 5 + 32).toFixed(1) + " °F"
        }
        return "This should not happen"
    }

    cardCycleUp = (index: number): void => {    
        const newForecastIndex: Array<number> = [...this.state.forecastIndex]
        newForecastIndex[index] = newForecastIndex[index]+1;
        this.setState({forecastIndex: newForecastIndex})
    }

    cardCycleDown = (index: number): void => {
        const newForecastIndex: Array<number> = [...this.state.forecastIndex]
        newForecastIndex[index] = newForecastIndex[index]-1;
        this.setState({forecastIndex: newForecastIndex})
    }

    render() {
        const cards = this.state.forecast.map((day, index) => {
            const forecast = this.state.code === 200 ? this.state.forecast[index][this.state.forecastIndex[index]] : null
            const temperature = this.getTemperature(forecast.main.temp)
            const card = this.state.code === 200 ? <WeatherCard dateTimestamp={forecast.dt} weatherInfo={forecast.weather} timezone={this.state.cityInfo.timezone} temp={temperature} /> : null
            return (
                    <Col key={index}>
                        <ArrowButton direction={Direction.up} clicked={() => this.cardCycleUp(index)} show={this.state.forecastIndex[index] < this.state.forecast[index].length-1}/>
                        {card}
                        <ArrowButton direction={Direction.down} clicked={() => this.cardCycleDown(index)} show={this.state.forecastIndex[index] > 0}/>
                    </Col>
            )
        })
        // const tempCast = this.state.code === 200 ? this.state.forecast[0][0] : null
        // const card = this.state.code === 200 ? <WeatherCard dateTimestamp={tempCast.dt} weatherInfo={tempCast.weather} timezone={this.state.cityInfo.timezone} temp={tempCast.main.temp}/> : null
        // const tempCast2 = this.state.code === 200 ? this.state.forecast[1][0] : null
        // const card2 = this.state.code === 200 ? <WeatherCard dateTimestamp={tempCast2.dt} weatherInfo={tempCast2.weather} timezone={this.state.cityInfo.timezone} temp={tempCast2.main.temp}/> : null
        return (
            <Container>
                <Row className="justify-content-center">
                    {cards}
                    {/* {card}
                    {card2} */}
                </Row>
            </Container>
        )
    }
}

export default Forecast
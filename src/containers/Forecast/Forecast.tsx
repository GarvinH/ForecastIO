import React from 'react'
import axios from '../../axios'
import { searchMode } from '../../enums'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import WeatherCard from '../../components/WeatherCard/WeatherCard'
import { timestampToAdjustedDate } from '../../Resolvers/DateResolver/DateResolver'
import { measurementSys } from '../../enums'
import ArrowButton, { Direction } from '../../components/UI/ArrowButton/ArrowButton'
import DetailedForecast from '../../components/DetailedWeather/DetailedWeather'
import { getTemperature } from '../../Resolvers/UnitResolver/UnitResolver'
import { getSearchPath, shouldUpdateSearch } from '../../Resolvers/SearchResolver/SearchResolver'

interface Props {
    readonly oldData: ForecastState | null,
    readonly saveData: (state: ForecastState) => void,
    readonly searchMethod: searchMode,
    readonly city: string,
    readonly coord: [string, string],
    readonly measureSys: measurementSys,
    readonly changedCity: (city: string) => void,
    readonly loading: boolean,
    readonly updateLoading: (value: boolean) => void
}

export interface ForecastState {
    readonly code: number | null;
    readonly message: string | null;
    readonly forecast: Array<Array<any>>;//openweathermap api docs are really lacking -> unpredicatble inputs -> can't type
    readonly cityInfo: any;
    readonly forecastIndex: Array<number>;
    readonly selectedForecast: [number, number];
}

class Forecast extends React.Component<Props> {
    state: ForecastState = {
        code: null,
        message: null,
        forecast: new Array<Array<any>>(5),
        cityInfo: {},
        forecastIndex: new Array<number>(5),
        selectedForecast: [0, 0],
    }

    componentDidMount() {
        if (this.props.oldData !== null && this.props.oldData.cityInfo.name === this.props.city) {
            this.setState(this.props.oldData)
            this.props.changedCity(this.props.oldData.cityInfo.name)
        } else if (this.props.city !== "" || (this.props.coord[0] !== "" && this.props.coord[1] !== "")) {
            this.getForecast()
        }

    }

    componentDidUpdate(prevProps: Props) {
        if (shouldUpdateSearch(this.props.city, this.props.coord, prevProps.city, prevProps.coord, this.props.searchMethod)) {
            this.getForecast()
        }
        console.log(this.state)
    }

    componentWillUnmount() {
        this.props.saveData(this.state)
    }

    getForecast = () => {
        this.props.updateLoading(true)
        const url = "/forecast" + getSearchPath(this.props.searchMethod, this.props.city, this.props.coord)
        axios.get(url).then(res => {

            const data = res.data

            if (data.cod !== 200) {
                throw res.data
            }

            const code = parseInt(data.cod)
            const cityInfo = data.city
            const forecast: Array<Array<any>> = [[], [], [], [], []]

            var index: number = -1
            var lastDate: number = 0;
            for (let weatherData of data.list) {//collect all data for corresponding days of the week
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

            const forecastIndex = forecast.map((day, index) => {//find appropriate time to display for default: 11am-2pm are default and varies according to timezone
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

            this.props.changedCity(data.city.name)
            this.setState({ code: code, forecast: forecast, cityInfo: cityInfo, forecastIndex: forecastIndex })
            this.props.updateLoading(false)
        }).catch(err => {
            console.log(err)
            this.setState({ code: err.cod, message: err.message })
            this.props.updateLoading(false)
        })
    }

    

    //index for the following methods refers to the index of the corresponding days
    cardCycleUp = (index: number): void => {
        const newForecastIndex: Array<number> = [...this.state.forecastIndex]
        newForecastIndex[index] = newForecastIndex[index] + 1;
        this.setState({ forecastIndex: newForecastIndex })
    }

    cardCycleDown = (index: number): void => {
        const newForecastIndex: Array<number> = [...this.state.forecastIndex]
        newForecastIndex[index] = newForecastIndex[index] - 1;
        this.setState({ forecastIndex: newForecastIndex })
    }

    changeSelectedForecast = (index: number): void => {
        this.setState({ selectedForecast: [index, this.state.forecastIndex[index]] })
    }

    render() {
        const cards = this.state.forecast.map((day, index) => {
            const forecast = this.state.code === 200 ? this.state.forecast[index][this.state.forecastIndex[index]] : null
            const temperature = getTemperature(forecast.main.temp, this.props.measureSys)
            const card = this.state.code === 200 ? <WeatherCard dateTimestamp={forecast.dt} weatherInfo={forecast.weather}
                timezone={this.state.cityInfo.timezone} temp={temperature} clicked={() => this.changeSelectedForecast(index)} /> : null
            return (
                <Col key={index} className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 text-center">
                    <ArrowButton direction={Direction.up} clicked={() => this.cardCycleUp(index)} show={this.state.forecastIndex[index] < this.state.forecast[index].length - 1} />
                    {card}
                    <ArrowButton direction={Direction.down} clicked={() => this.cardCycleDown(index)} show={this.state.forecastIndex[index] > 0} />
                </Col>
            )
        })
        const detailedInfo = this.state.code === 200 ? this.state.forecast[this.state.selectedForecast[0]][this.state.selectedForecast[1]] : null
        const detailedForecast = this.state.code === 200 ? <DetailedForecast weather={detailedInfo} timezone={this.state.cityInfo.timezone} measureSys={this.props.measureSys} /> : null
        // const tempCast2 = this.state.code === 200 ? this.state.forecast[1][0] : null
        // const card2 = this.state.code === 200 ? <WeatherCard dateTimestamp={tempCast2.dt} weatherInfo={tempCast2.weather} timezone={this.state.cityInfo.timezone} temp={tempCast2.main.temp}/> : null
        return (this.props.loading ?

            (<Container className="text-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>) :

            (<Container>
                <Row className="justify-content-center">
                    {cards}
                    {detailedForecast}
                </Row>
            </Container>)
        )
    }
}

export default Forecast
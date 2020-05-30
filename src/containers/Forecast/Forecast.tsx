import React from 'react'
import axios from 'axios'
import { searchMode } from '../../enums'
import { Container } from 'react-bootstrap'
import WeatherCard from '../../components/WeatherCard/WeatherCard'

interface Props {
    searchMethod: searchMode,
    city: string,
    coord: [string, string]
}

interface State {
    code: number | null;
    message: string | null;
    forecast: Array<Array<any>>;
    cityInfo: any;
}

class Forecast extends React.Component<Props> {
    state: State = {
        code: null,
        message: null,
        forecast: new Array<Array<any>>(),
        cityInfo: {}
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.city !== prevProps.city || this.props.coord !== prevProps.coord) {
            this.getForecast()
        }
        console.log(this.state)
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
                const date = parseInt(weatherData.dt_txt.split(" ")[0].split("-")[2])
                if (lastDate !== date) {
                    index++;
                    lastDate = date
                }
                if (index === 5) {
                    break;
                }
                forecast[index].push(weatherData)
            }

            this.setState({code: code, forecast: forecast, cityInfo: cityInfo})
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

    render() {
        const tempCast = this.state.code === 200 ? this.state.forecast[0][0] : null
        const card = this.state.code === 200 ? <WeatherCard dateTimestamp={tempCast.dt} weatherInfo={tempCast.weather} timezone={this.state.cityInfo.timezone}/> : null
        return (
            card
        )
    }
}

export default Forecast
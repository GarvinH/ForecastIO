import React from 'react'
import axios from 'axios'
import { getSearchPath, shouldUpdateSearch } from '../../Resolvers/SearchResolver/SearchResolver'
import { searchMode, measurementSys } from '../../enums'
import DetailedWeather from '../../components/DetailedWeather/DetailedWeather'
import { Container, Alert } from 'react-bootstrap'
import { contentDeterminer } from '../../Resolvers/ContentResolver/ContentResolver'

interface Props {
    city: string,
    coord: [string, string],
    searchMethod: searchMode,
    cityChanged: (city: string) => void,
    measureSys: measurementSys,
    loading: boolean,
    updateLoading: (value: boolean) => void
}

export interface CurrentState {
    code: number | null;
    message: string | null;
    weather: any;
}

class Current extends React.Component<Props> {
    state: CurrentState = {
        code: null,
        message: null,
        weather: {},
    }

    componentDidMount() {
        if (this.props.city !== "" || (this.props.coord[0] !== "" && this.props.coord[1] !== "")) {
            this.getCurrent()
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (shouldUpdateSearch(this.props.city, this.props.coord, prevProps.city, prevProps.coord, this.props.searchMethod)) {
            this.getCurrent()
        }
    }

    getCurrent = () => {
        this.props.updateLoading(true)
        const url = "/current" + getSearchPath(this.props.searchMethod, this.props.city, this.props.coord)
        axios.post(url).then(res => {
            const data = res.data

            if (data.cod !== 200) {
                throw res.data
            }

            this.props.cityChanged(data.name)
            this.props.updateLoading(false)
            this.setState({ weather: data, code: data.cod })
        }).catch(err => {
            const response = err.response
            this.setState({ code: response.status, message: response.data.message })
            this.props.updateLoading(false)
        })
    }

    

    render() {
        const currentWeather = this.state.code === 200 ? <DetailedWeather weather={this.state.weather} measureSys={this.props.measureSys} timezone={this.state.weather.timezone} /> : null
        const weatherInfo = <Container>
            {this.state.code === 200 ? <Alert className="text-center" variant="info">Time is only as accurate as OpenWeatherMap API provides it. Time will usually be accurate within 10 minutes.</Alert> : null}
            {currentWeather}
        </Container>
        
        const content = contentDeterminer(weatherInfo, this.props.loading, this.state.code, this.state.message)

        return content
    }
}

export default Current
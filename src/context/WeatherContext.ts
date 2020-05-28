import React from 'react'
import { weatherMode, searchMode} from '../enums'

const WeatherContext = React.createContext({
    changeWeatherMode: (value: weatherMode) => {},
    changeSearchMode: (value: searchMode) => {},
    weatherMode: weatherMode.forecast,
    searchMode: searchMode.city,
    city: "",
    coord: ["", ""],
    cityChanged: (city: string) => {},
    coordChanged: (index: number, value:string) => {}
})

export default WeatherContext
import React from 'react'
import { weatherMode, searchMode, measurementSys} from '../enums'

const WeatherContext = React.createContext({
    changeWeatherMode: (value: weatherMode) => {},
    changeSearchMode: (value: searchMode) => {},
    weatherMode: weatherMode.forecast,
    searchMode: searchMode.city,
    city: "",
    coord: ["", ""],
    cityChanged: (city: string) => {},
    coordChanged: (coord: Array<string>) => {},
    measureSys: measurementSys.Celcius,
    measureSysChanged: (value: number) => {}
})

export default WeatherContext
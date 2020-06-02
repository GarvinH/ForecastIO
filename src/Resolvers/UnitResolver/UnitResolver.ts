import { measurementSys } from '../../enums'

//takes kelvin
export const getTemperature = (temp: number, measureSys: measurementSys): string => {
    switch (Number(measureSys)) {
        case (measurementSys.Kelvin):
            return temp.toFixed(1) + " K"
        case (measurementSys.Metric):
            return (temp - 273.15).toFixed(1) + " °C"
        case (measurementSys.Imperial):
            return ((temp - 273.15) * 9 / 5 + 32).toFixed(1) + " °F"
    }
    return "This should not happen"
}

//takes degrees
export const angleToDirection = (angle: number) => {
    const output = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    angle = Math.round(angle / (360/16))
    angle %= 16
    return output[angle]
}

//takes m/s
export const getSpeed = (speed: number, measureSys: measurementSys): string => {
    const kmh = speed * 3600 / 1000
    switch (Number(measureSys)) {
        case (measurementSys.Imperial):
            return (kmh / 1.60934).toFixed(1) + " MPH "
        default:
            return kmh.toFixed(1) + " km/h "
    }
}

//takes mm
export const getVolume = (volume: number, measureSys: measurementSys): string => {
    switch (Number(measureSys)) {
        case (measurementSys.Imperial):
            return Math.round(volume / 25.4*100)/100 + " in."
        default:
            return volume.toFixed(2) + " mm"
    }
}
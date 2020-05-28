import { weatherMode, searchMode, actionTypes } from './enums'

export interface State {
    readonly weatherMode: weatherMode;
    readonly searchMode: searchMode;
}

interface WeatherAction {
    type: actionTypes.changeWeatherMode;
    value: weatherMode;
}

interface SearchAction {
    type: actionTypes.changeSearchMode;
    value: searchMode;
}

export type Action = WeatherAction | SearchAction

const initialState: State = {
    weatherMode: weatherMode.forecast,
    searchMode: searchMode.city
}

const reducer = (state = initialState, action: Action): State {
    switch(action.type) {
        case (actionTypes.changeWeatherMode):
            return {
                ...state,
                weatherMode: action.value
            }
        case (actionTypes.changeSearchMode):
            return {
                ...state,
                searchMode: action.value
            }
    }
}

export default reducer
import { searchMode } from '../../enums'

export const shouldUpdateSearch = (currentCity: string, currentCoord: [string, string], oldCity: string, oldCoord: [string, string], searchMethod: searchMode) => {
    if ((currentCity !== oldCity && searchMethod === searchMode.city) || (currentCoord !== oldCoord && searchMethod === searchMode.coord)) {
        return true
    }
    return false
}

export const getSearchPath = (searchMethod: searchMode, city: string, coord:[string, string]) => {
    switch (searchMethod) {
        case (searchMode.city):
            return "/city?city=" + city
        case (searchMode.coord):
            return "/coord?lat=" + coord[0] + "&lon=" + coord[1]
    }
}
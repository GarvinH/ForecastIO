import React from 'react';
import Layout from './components/Layout/Layout'
import { Switch, Route, Redirect } from 'react-router-dom'
import { weatherMode, searchMode } from './enums'
import WeatherContext from './context/WeatherContext'
import Forecast from './containers/Forecast/Forecast'

interface State {
  readonly weatherMethod: weatherMode;
  readonly searchMethod: searchMode;
  readonly city: string;
  readonly coord: [string, string];
}

class App extends React.Component {
  state: State = {
    weatherMethod: weatherMode.forecast,
    searchMethod: searchMode.city,
    city: "",
    coord: ["", ""],
  }

  changeWeather = (value: weatherMode) => {
    this.setState({ weatherMethod: value })
  }

  changeSearch = (value: searchMode) => {
    this.setState({ searchMethod: value })
  }

  changeCity = (city: string) => {
    this.setState({ city: city })
  }

  changeCoord = (index: number, value: string) => {
    const newCoord = [...this.state.coord]
    newCoord[index] = value
    this.setState({ coord: newCoord })
  }

  render() {
    return (
      <WeatherContext.Provider value={{
        changeWeatherMode: this.changeWeather,
        changeSearchMode: this.changeSearch,
        weatherMode: this.state.weatherMethod,
        searchMode: this.state.searchMethod,
        city: this.state.city,
        coord: this.state.coord,
        cityChanged: this.changeCity,
        coordChanged: this.changeCoord
      }}>
        <Layout>
          <Switch>
            <Route path="/forecast" render={() => <Forecast city={this.state.city} coord={this.state.coord}
            searchMethod={this.state.searchMethod}/>} />
            <Route path="/current" render={() => <h1>current</h1>} />
            <Redirect to="/forecast" />
          </Switch>
        </Layout>
      </WeatherContext.Provider>
    );
  }
}

export default App;

import React from 'react';
import Layout from './components/Layout/Layout'
import { Switch, Route, Redirect } from 'react-router-dom'
import { weatherMode, searchMode } from './enums'
import WeatherContext from './context/WeatherContext'

interface State {
  readonly weatherMethod: weatherMode;
  readonly searchMethod: searchMode;
  readonly city: string;
  readonly coord: [number | null, number | null];
}

class App extends React.Component {
  state: State = {
    weatherMethod: weatherMode.forecast,
    searchMethod: searchMode.city,
    city: "",
    coord: [null, null],
  }

  changeWeather = (value: weatherMode) => {
    this.setState({weatherMethod: value})
  }

  changeSearch = (value: searchMode) => {
    this.setState({searchMethod: value})
  }

  render() {
    return (
      <WeatherContext.Provider value={{
        changeWeatherMode: this.changeWeather,
        changeSearchMode: this.changeSearch,
        weatherMode: this.state.weatherMethod,
        searchMode: this.state.searchMethod
      }}>
        <Layout>
          <Switch>
            <Route path="/forecast" render={() => <h1>forecast</h1>} />
            <Route path="/current" render={() => <h1>current</h1>} />
            <Redirect to="/forecast" />
          </Switch>
        </Layout>
      </WeatherContext.Provider>
    );
  }
}

export default App;

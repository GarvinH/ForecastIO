import React, { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { weatherMode, searchMode, measurementSys } from "./enums";
import WeatherContext from "./context/WeatherContext";
import { ForecastState } from "./containers/Forecast/Forecast";
import { Spinner, Container } from "react-bootstrap";

const Forecast = React.lazy(() => import("./containers/Forecast/Forecast"));
const Current = React.lazy(() => import("./containers/Current/Current"));

interface State {
  readonly weatherMethod: weatherMode;
  readonly searchMethod: searchMode;
  readonly city: string;
  readonly coord: [string, string];
  readonly measureSys: measurementSys;
  readonly loading: boolean;
  readonly forecastData: ForecastState | null;
}

interface PathParams {
  path: string;
}

type Props = RouteComponentProps<PathParams>;

class App extends React.Component<Props> {
  state: State = {
    weatherMethod: weatherMode.forecast,
    searchMethod: searchMode.city,
    city: "",
    coord: ["", ""],
    measureSys: measurementSys.Metric,
    loading: false,
    forecastData: null,
  };

  componentDidMount() {
    const location = this.props.location.pathname;
    switch (location) {
      case "/forecast":
        this.changeWeather(weatherMode.forecast);
        break;
      case "/current":
        this.changeWeather(weatherMode.current);
        break;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newCoord = [];
        newCoord.push(position.coords.latitude);
        newCoord.push(position.coords.longitude);
        this.setState({ coord: newCoord, searchMethod: searchMode.coord });
      });
    }
  }

  changeWeather = (value: weatherMode) => {
    this.setState({ weatherMethod: value });
  };

  changeSearch = (value: searchMode) => {
    this.setState({ searchMethod: value });
  };

  changeCity = (city: string) => {
    this.setState({ city: city });
  };

  changeCoord = (coord: Array<string>) => {
    const newCoord = [...coord];
    this.setState({ coord: newCoord });
  };

  measureSysChange = (value: measurementSys) => {
    this.setState({ measureSys: value });
  };

  updateLoading = (newLoading: boolean) => {
    this.setState({ loading: newLoading });
  };

  saveForecastData = (state: ForecastState) => {
    this.setState({ forecastData: state });
  };

  render() {
    return (
      <WeatherContext.Provider
        value={{
          changeWeatherMode: this.changeWeather,
          changeSearchMode: this.changeSearch,
          weatherMode: this.state.weatherMethod,
          searchMode: this.state.searchMethod,
          city: this.state.city,
          coord: this.state.coord,
          cityChanged: this.changeCity,
          coordChanged: this.changeCoord,
          measureSys: this.state.measureSys,
          measureSysChanged: this.measureSysChange,
        }}
      >
        <Layout>
          <Switch>
            <Route
              path={"/forecast"}
              render={() => (
                <Suspense
                  fallback={
                    <Container className="text-center">
                      <Spinner animation="border" role="status" />
                    </Container>
                  }
                >
                  <Forecast
                    city={this.state.city}
                    coord={this.state.coord}
                    searchMethod={this.state.searchMethod}
                    measureSys={this.state.measureSys}
                    changedCity={this.changeCity}
                    loading={this.state.loading}
                    updateLoading={this.updateLoading}
                    oldData={this.state.forecastData}
                    saveData={this.saveForecastData}
                  />
                </Suspense>
              )}
            />
            <Route
              path={"/current"}
              render={() => (
                <Suspense
                  fallback={
                    <Container className="text-center">
                      <Spinner animation="border" role="status" />
                    </Container>
                  }
                >
                  <Current
                    city={this.state.city}
                    coord={this.state.coord}
                    searchMethod={this.state.searchMethod}
                    cityChanged={this.changeCity}
                    measureSys={this.state.measureSys}
                    loading={this.state.loading}
                    updateLoading={this.updateLoading}
                  />
                </Suspense>
              )}
            />
            <Redirect to={"/forecast"} />
          </Switch>
        </Layout>
      </WeatherContext.Provider>
    );
  }
}

export default withRouter(App);

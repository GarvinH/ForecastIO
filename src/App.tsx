import React from 'react';
import Layout from './components/Layout/Layout'
import { Switch, Route, Redirect } from 'react-router-dom'

class App extends React.Component {

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/forecast" render={() => <h1>forecast</h1>} />
          <Route path="/current" render={() => <h1>current</h1>} />
          <Redirect to="/forecast" />
        </Switch>
      </Layout>
    );
  }
}

export default App;

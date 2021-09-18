import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { Provider, connect } from "react-redux";
import store from "./store";
import Home from "./Home"


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" render={props => <Home />} />
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
});

//actions que utilizo en este componente
export default connect(mapStateToProps, { })(App);


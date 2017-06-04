import React from "react";
import Index from "./index";
import Exchangeoverview from "./exchangeoverview";
import { Router, Scene } from "react-native-router-flux";
import Page from "./page";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={Index} initial={true} />
          <Scene key="page" component={Page} />
        </Scene>
      </Router>
    );
  }
}

import React from "react";
import Index from "./index";
import Exchangeoverview from "./exchangeoverview";
import { Router, Scene } from "react-native-router-flux";
import Page from "./page";
import { So, Bo, Mk } from "./pageviews";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={Index} initial={true} />
          <Scene key="page" component={Page} />
          <Scene key="so" component={So} />
          <Scene key="bo" component={Bo} />
          <Scene key="mk" component={Mk} />
        </Scene>
      </Router>
    );
  }
}

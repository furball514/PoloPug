import React from "react";
import { Container, Tab, Tabs, Header, ScrollableTab } from "native-base";
import { Text, View } from "react-native";
import Exchangeoverview from "./exchangeoverview";
import Troll from "./trollbox";
import Margin from "./margin";
import myThemes from "./Themes/myThemes";
import Web from "./webjs.js";

/**
 * 
 * 
 * @export
 * @class Index
 * @extends {React.Component}
 */

export default class Index extends React.Component {
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "green" }} title="Poloniex" hasTabs>
          <Text style={{ color: "white" }}> Poloview </Text>
        </Header>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="Exchange">
            <Exchangeoverview />
          </Tab>
          <Tab heading="Margin">
            <Margin />
          </Tab>
          <Tab heading="Trollbox">
            <Troll />
          </Tab>
          <Tab heading="poloniex.com">
            <Web />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

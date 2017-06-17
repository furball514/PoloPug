import React from "react";
import { Container, Tab, Tabs, Header, ScrollableTab } from "native-base";
import { Text, View } from "react-native";
import Exchangeoverview from "./exchangeoverview";
import { Troll } from "./trollbox";
import Margin from "./margin";
import myThemes from "./Themes/myThemes";
import Web from "./webjs.js";
import { Reddit } from "./reddit";

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
        <Header hasTabs>
          <Text>
            {" "}This project is open sourced under the GNU-GPL v3.0 License.
            {" "}
          </Text>
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
          <Tab heading="Reddit">
            <Reddit />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
//heading
//loading -all
//features, improvements -all

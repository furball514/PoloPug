import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  List,
  ListItem,
  H3,
  Body
} from "native-base";
import axios from "axios";

export default class Margin extends React.Component {
  state = {
    data: [],
    text: "BTC"
  };

  getData() {
    axios
      .get(
        `https://poloniex.com/public?command=returnLoanOrders&currency=${encodeURIComponent(
          this.state.text
        )}`
      )
      .then(data => {
        this.setState({
          data: data.data
        });
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "yellow" }}>
          <Text style={styles.text}> Coming Soon </Text>
        </Header>
        <Content>
          <Item rounded>
            <Input
              style={{ color: "white" }}
              placeholder="Enter Currency Pair"
              placeholderTextColor="white"
              maxLength={5}
              autoCapitalize="characters"
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              onSubmitEditing={e => {
                this.getData();
              }}
              returnKeyType="go"
            />
          </Item>
          <H3 style={{ color: "white" }}> OFFERS </H3>
          <List
            dataArray={this.state.data.offers}
            renderHeader={() =>
              <Text style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1 }}> Rate </Text>
                <Text style={{ flex: 1 }}> Amount </Text>
                <Text style={{ flex: 1 }}> RangeMin </Text>
                <Text style={{ flex: 1 }}> RangeMax </Text>
              </Text>}
            renderRow={offer => {
              <ListItem>
                <Body>
                  <Text style={styles.content}>
                    {offer.rate}
                  </Text>
                </Body>
              </ListItem>;
            }}
          />
          <H3 style={{ color: "white" }}> DEMANDS </H3>
          <List
            dataArray={this.state.data.demands}
            renderHeader={() =>
              <Text style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1 }}> Rate </Text>
                <Text style={{ flex: 1 }}> Amount </Text>
                <Text style={{ flex: 1 }}> RangeMin </Text>
                <Text style={{ flex: 1 }}> RangeMax </Text>
              </Text>}
            renderRow={demand => {
              <ListItem>
                <Body>
                  <Text style={styles.content}>
                    {demand.rate}
                  </Text>
                </Body>
              </ListItem>;
            }}
          />
          {/*<WebView
            style={{ height: 900, alignSelf: "stretch" }}
            source={{ uri: "https://m.poloniex.com/#/marginTrading" }}
          />*/}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontStyle: "italic"
  },
  content: {
    color: "white"
  }
});

//input
//table
//webview

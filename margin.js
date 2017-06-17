import React from "react";
import { StyleSheet, Text, WebView } from "react-native";
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
import Loading from "./loading";

export default class Margin extends React.Component {
  state = {
    offers: Array,
    demands: Array,
    text: "BTC"
  };

  getData() {
    axios
      .get(
        `https://poloniex.com/public?command=returnLoanOrders&currency=${this
          .state.text}`
      )
      .then(data => {
        this.setState({
          offers: data.data.offers,
          demands: data.data.demands
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
        <Content style={{ marginTop: 10 }}>
          <Item rounded>
            <Input
              style={{ color: "white" }}
              placeholder="Enter Currency Code"
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
          <H3
            style={{
              color: "white",
              textDecorationLine: "underline",
              marginLeft: 10,
              marginTop: 10
            }}
          >
            {" "}OFFERS
            {" "}
          </H3>
          <List
            style={{ marginTop: 5 }}
            dataArray={this.state.offers}
            renderHeader={() =>
              <Text
                style={{
                  flexDirection: "row",
                  marginLeft: 10
                }}
              >
                <Text style={{ flex: 1, color: "lightblue" }}> Rate </Text>
                <Text style={{ flex: 1, color: "lightblue" }}> Amount </Text>
                <Text style={{ flex: 1, color: "lightblue" }}> RangeMin </Text>
                <Text style={{ flex: 1, color: "lightblue" }}> RangeMax </Text>
              </Text>}
            renderRow={offer =>
              <ListItem>
                <Body>
                  <Text
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <Text style={{ flex: 1, color: "white", fontSize: 15 }}>
                      {offer.rate}
                    </Text>
                    <Text>{"   "}</Text>
                    <Text style={{ flex: 1, color: "white", fontSize: 15 }}>
                      {offer.amount}
                    </Text>
                    <Text>{"   "}</Text>
                    <Text style={{ flex: 1, color: "white", fontSize: 15 }}>
                      {offer.rangeMin}
                    </Text>
                    <Text>{"   "}</Text>
                    <Text style={{ flex: 1, color: "white", fontSize: 15 }}>
                      {offer.rangeMax}
                    </Text>
                  </Text>
                </Body>
              </ListItem>}
          />
          <Text>{" "}</Text>
          <H3
            style={{
              color: "white",
              textDecorationLine: "underline",
              marginLeft: 10
            }}
          >
            {" "}DEMANDS
            {" "}
          </H3>
          <List
            style={{ marginTop: 5 }}
            dataArray={this.state.demands}
            renderHeader={() =>
              <Text
                style={{
                  flexDirection: "row",
                  marginLeft: 10
                }}
              >
                <Text style={{ flex: 1, color: "lightblue" }}> Rate </Text>
                <Text style={{ flex: 1, color: "lightblue" }}> Amount </Text>
                <Text style={{ flex: 1, color: "lightblue" }}> RangeMin </Text>
                <Text style={{ flex: 1, color: "lightblue" }}> RangeMax </Text>
              </Text>}
            renderRow={demand =>
              <ListItem>
                <Body>
                  <Text
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <Text style={{ flex: 1, color: "white", fontSize: 15 }}>
                      {demand.rate}
                    </Text>
                    <Text>{"   "}</Text>
                    <Text style={{ flex: 1, color: "white", fontSize: 15 }}>
                      {demand.amount}
                    </Text>
                    <Text>{"   "}</Text>
                    <Text style={{ flex: 1, color: "white", fontSize: 15 }}>
                      {demand.rangeMin}
                    </Text>
                    <Text>{"   "}</Text>
                    <Text style={{ flex: 1, color: "white", fontSize: 15 }}>
                      {demand.rangeMax}
                    </Text>
                  </Text>
                </Body>
              </ListItem>}
          />
          <WebView
            style={{ height: 1500, alignSelf: "stretch" }}
            source={{ uri: "https://m.poloniex.com/#/marginTrading" }}
            renderLoading={() => <Loading />}
          />
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


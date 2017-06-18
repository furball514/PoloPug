import React from "react";
import { Text, WebView, View } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Header,
  Body,
  Segment,
  Button,
  Fab,
  Left,
  Right,
  Thumbnail,
  Icon
} from "native-base";
import { Actions } from "react-native-router-flux";
import axios from "axios";

export class Reddit extends React.Component {
  state = {
    cryptocurrency: {
      hot: [],
      new: [],
      top: [],
      rising: [],
      controversial: []
    },
    poloniex: {
      hot: [],
      new: [],
      top: [],
      rising: [],
      controversial: []
    },
    crypto: false,
    show: "hot",
    active: false
  };

  fetchData() {
    const hotCrypto = () =>
      axios.get("https://www.reddit.com/r/CryptoCurrency/hot.json");
    const newCrypto = () =>
      axios.get("https://www.reddit.com/r/CryptoCurrency/new.json");
    const topCrypto = () =>
      axios.get("https://www.reddit.com/r/CryptoCurrency/top.json");
    const risingCrypto = () =>
      axios.get("https://www.reddit.com/r/CryptoCurrency/rising.json");
    const controCrypto = () =>
      axios.get("https://www.reddit.com/r/CryptoCurrency/controversial.json");
    const hotPolo = () =>
      axios.get("https://www.reddit.com/r/PoloniexForum/hot.json");
    const newPolo = () =>
      axios.get("https://www.reddit.com/r/PoloniexForum/new.json");
    const topPolo = () =>
      axios.get("https://www.reddit.com/r/PoloniexForum/top.json");
    const risingPolo = () =>
      axios.get("https://www.reddit.com/r/PoloniexForum/rising.json");
    const controPolo = () =>
      axios.get("https://www.reddit.com/r/PoloniexForum/controversial.json");

    axios
      .all([
        hotCrypto(),
        newCrypto(),
        topCrypto(),
        risingCrypto(),
        controCrypto(),
        hotPolo(),
        newPolo(),
        topPolo(),
        risingPolo(),
        controPolo()
      ])
      .then(
        axios.spread(
          (hotC, newC, topC, risC, conC, hotP, newP, topP, risP, conP) => {
            this.setState({
              cryptocurrency: {
                hot: hotC.data.data.children,
                new: newC.data.data.children,
                top: topC.data.data.children,
                rising: risC.data.data.children,
                controversial: conC.data.data.children
              },
              poloniex: {
                hot: hotP.data.data.children,
                new: newP.data.data.children,
                top: topP.data.data.children,
                rising: risP.data.data.children,
                controversial: conP.data.data.children
              }
            });
          }
        )
      );
  }

  componentDidMount() {
    //this.fetchData();
  }

  render() {
    return (
      <Container>
        <Container>
          <Header style={{ marginTop: 15 }}>
            <Text>{"  "}</Text>
            <Body>
              <Segment
                style={{
                  alignSelf: "stretch"
                }}
              >
                <Button
                  first
                  active={this.state.crypto}
                  onPress={() => {
                    this.setState({ crypto: !this.state.crypto });
                  }}
                >
                  <Text
                    style={{
                      color: "orangered",
                      fontSize: 11
                    }}
                  >
                    r/CryptoCurrency
                  </Text>
                </Button>
                <Button
                  last
                  active={!this.state.crypto}
                  onPress={() => {
                    this.setState({ crypto: !this.state.crypto });
                  }}
                >
                  <Text style={{ color: "orangered", fontSize: 11 }}>
                    r/PoloniexForum
                  </Text>
                </Button>
              </Segment>
            </Body>
            <Text>{"             "}</Text>
          </Header>
          <Content style={{ borderLeftColor: "white", borderLeftWidth: 1 }}>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 1,
                marginTop: 10
              }}
            />
            <Text
              style={{
                backgroundColor: "black"
              }}
            >
              <Text>{"  "}</Text>
              <Text
                style={{
                  color: "orangered"
                }}
              >
                [{this.state.show.toUpperCase()}]
              </Text>
              <Text>{"                    "}</Text>
              <Text style={{ color: "orangered" }}>
                {this.state.crypto ? "r/Cryptocurrency" : "r/PoloniexForum"}
              </Text>
            </Text>
            <View
              style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
            />
            <RedditViews
              cryptocurrency={this.state.cryptocurrency}
              poloniex={this.state.poloniex}
              crypto={this.state.crypto}
              show={this.state.show}
            />
          </Content>
        </Container>
        <View>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ marginLeft: 10 }}
            style={{ backgroundColor: "black" }}
            position="bottomLeft"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon name="menu" />
            <Button
              style={{ backgroundColor: "orangered" }}
              onPress={() => {
                this.setState({ show: "controversial" });
              }}
            >
              <Thumbnail
                source={require("./reddit/controversial.png")}
                small
                style={{ width: 20, height: 20 }}
              />
            </Button>
            <Button
              style={{ backgroundColor: "orangered" }}
              onPress={() => {
                this.setState({ show: "rising" });
              }}
            >
              <Thumbnail
                source={require("./reddit/rising.png")}
                small
                style={{ width: 25, height: 25 }}
              />
            </Button>
            <Button
              style={{ backgroundColor: "black" }}
              onPress={() => {
                this.setState({ show: "top" });
              }}
            >
              <Thumbnail
                source={require("./reddit/top.png")}
                small
                style={{ width: 23, height: 23 }}
              />
            </Button>
            <Button
              style={{ backgroundColor: "black" }}
              onPress={() => {
                this.setState({ show: "new" });
              }}
            >
              <Thumbnail
                source={require("./reddit/new.png")}
                style={{ width: 23, height: 23 }}
              />
            </Button>
            <Button
              style={{ backgroundColor: "black" }}
              onPress={() => {
                this.setState({ show: "hot" });
              }}
            >
              <Thumbnail
                source={require("./reddit/hot.png")}
                style={{ width: 25, height: 25 }}
              />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}

class RedditViews extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: "#212121", marginTop: 10 }}>
        <Text />
      </View>
    );
  }
}

export class RedditOpen extends React.Component {
  render() {
    return <WebView />;
  }
}

//sort
//open webview
//refreshcontrol

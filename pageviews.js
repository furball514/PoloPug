import React from "react";
import { StyleSheet, View, Text, WebView, Slider } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  List,
  ListItem,
  Footer,
  H3
} from "native-base";
import Pusher from "pusher-js/react-native";
import axios from "axios";

export default class Views extends React.Component {
  roundOffChange() {
    let change = this.props.tickerData.percentChange;
    let result;
    switch (change.charAt(0)) {
      case "-":
        result = change.replace(
          change.substr(change.indexOf(".") + 3, change.length),
          ""
        );
        break;
      default:
        result = `+${change.replace(
          change.substr(change.indexOf(".") + 3, change.length),
          ""
        )}`;
        break;
    }
    return result;
  }

  roundOffVolume() {
    let vol = this.props.tickerData.baseVolume;
    return vol
      .replace(vol.substr(vol.indexOf(".") + 4, vol.length))
      .replace("undefined", " ");
  }

  colorAssign() {
    let change = this.props.tickerData.percentChange;
    let result;
    switch (change.charAt(0)) {
      case "-":
        result = { color: "#7b1111" };
        break;
      default:
        result = { color: "green" };
        break;
    }
    return result;
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Left />
              <Body>
                <Text style={styles.title}>
                  {" "}{`${this.props.base}/${this.props.quote}`}{" "}
                </Text>
              </Body>
              <Right />
            </CardItem>
            <CardItem>
              <Text style={styles.subtitle}>
                <Text
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text> 24hr:</Text>
                  <Text style={this.colorAssign()}>
                    {this.roundOffChange()}%
                  </Text>
                </Text>
                <Text> {"  "} </Text>
                <Text>
                  Vol:{this.roundOffVolume()}{this.props.quote}
                </Text>
              </Text>
            </CardItem>
            <View style={styles.border} />
            <CardItem cardBody bordered={true}>
              <Body>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>
                    {" "}{this.props.tickerData.last}{" "}
                  </Text>
                  <Slider
                    disabled={true}
                    maximumTrackTintColor="#888d91"
                    minimumTrackTintColor="#888d91"
                    maximumValue={Number(this.props.tickerData.high)}
                    minimumValue={Number(this.props.tickerData.low)}
                    value={Number(this.props.tickerData.last)}
                    thumbTintColor="#e39706"
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-around",
                      flexDirection: "row"
                    }}
                  >
                    <Text style={styles.subPrice}>
                      {" "}L: {this.props.tickerData.low} {" "}
                    </Text>
                    <Text style={styles.subPrice}>
                      {" "}H: {this.props.tickerData.high} {" "}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
          <View
            style={{
              borderBottomColor: "#888d91",
              borderBottomWidth: 1
            }}
          />

          <Card>
            <WebView
              source={{
                uri: `https://bright-element.glitch.me/charts/${this.props
                  .tickerData.currencyPair}`
              }}
              style={{ height: 500, alignSelf: "stretch" }}
            />
          </Card>
          <View style={styles.border} />

          <ViewsTwo pair={this.props.tickerData.currencyPair} />

          <Footer
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Text style={styles.footerSub}>
              {`Quote Volume: ${this.props.tickerData.quoteVolume}`}
            </Text>
            <Text style={styles.footerSub}>
              {`Lowest Ask: ${this.props.tickerData.lowestAsk}`}
            </Text>
            <Text style={styles.footerSub}>
              {`Highest Bid: ${this.props.tickerData.highestBid}`}
            </Text>
          </Footer>
        </Content>
      </Container>
    );
  }
}

class ViewsTwo extends React.Component {
  state = {
    buyOrders: [],
    sellOrders: [],
    tradeHistory: []
  };

  componentWillMount() {
    Pusher.logToConsole = true;
    const pusher = new Pusher("fcd289e4102c38a00414", {
      encrypted: true
    });
    axios
      .get(`https://bright-element.glitch.me/orders/${this.props.pair}`)
      .then(() => {
        const orderChannel = pusher.subscribe("channel");
        orderChannel.bind("buyorders", buyOrders => {
          this.setState({
            buyOrders: this.state.buyOrders.concat([buyOrders])
          });
        });
        orderChannel.bind("sellorders", sellOrders => {
          this.setState({
            sellOrders: this.state.sellOrders.concat([sellOrders])
          });
        });
      });
  }

  refresh() {
    axios
      .get(
        `https://poloniex.com/public?command=returnTradeHistory&currencyPair=${this
          .props.pair}`
      )
      .then(responseData => {
        this.setState({ tradeHistory: responseData.data });
      });
  }

  async componentDidMount() {
    let v;
    try {
      v = await this.refresh();
    } catch (error) {
      console.error(error);
    }
    setInterval(() => {
      //this.refresh(); //to be uncommented
      console.log("refreshed");
    }, 5000);
  }

  render() {
    console.log(`buy: ${this.state.buyOrders.length}`);
    console.log(`sell: ${this.state.sellOrders.length}`);
    console.log(`trade: ${this.state.tradeHistory.length}`);
    return (
      <Container>
        <Card>
          <H3> BUY ORDERS </H3>
          <List
            style={{ height: 500 }}
            dataArray={this.state.buyOrders}
            renderRow={item =>
              <ListItem>
                <Text>
                  {" "}
                  {JSON.stringify(item)}
                  {" "}
                </Text>
              </ListItem>}
          />
        </Card>
        <View style={styles.border} />

        <Card>
          <H3> SELL ORDERS </H3>
          <List
            style={{ height: 500 }}
            dataArray={this.state.sellOrders}
            renderRow={item =>
              <ListItem>
                <Text>
                  {JSON.stringify(item)}
                </Text>
              </ListItem>}
          />
        </Card>
        <View style={styles.border} />

        <Card>
          <H3> MARKET HISTORY </H3>
          <List
            style={{ height: 500 }}
            dataArray={this.state.tradeHistory}
            renderRow={item =>
              <ListItem>
                <Text>
                  {JSON.stringify(item)}
                </Text>
              </ListItem>}
          />
          <View style={styles.border} />
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#3a4449"
  },
  subtitle: {
    fontSize: 15,
    alignSelf: "stretch"
  },
  priceContainer: {
    backgroundColor: "#e8eaf6",
    alignSelf: "stretch"
  },
  price: {
    color: "#e39706",
    fontSize: 28,
    textAlign: "center"
  },
  subPrice: {
    color: "#888d91",
    fontSize: 15
  },
  border: {
    borderBottomColor: "#888d91",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  footerSub: {
    fontSize: 10,
    color: "white"
  }
});

//clearinterval
//appstate
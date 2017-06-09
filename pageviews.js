import React from "react";
import {
  StyleSheet,
  View,
  Text,
  WebView,
  Slider,
  Switch,
  AsyncStorage,
  Linking
} from "react-native";
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
            <Text
              style={{
                fontSize: 14,
                color: "blue",
                textDecorationLine: "underline"
              }}
              onPress={e => {
                Linking.openURL(
                  `https://bright-element.glitch.me/charts/${this.props
                    .tickerData.currencyPair}`
                ).catch(err => {
                  console.error(err);
                });
              }}
            >
              {" "}Open in browser
              {" "}
            </Text>
          </Card>
          <View style={styles.border} />

          <ViewsTwo
            pair={this.props.tickerData.currencyPair}
            base={this.props.base}
            quote={this.props.quote}
          />

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
    tradeHistory: [],
    delayed: true
  };

  realtimeOrders() {
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
        }); //unshift not concat
        orderChannel.bind("sellorders", sellOrders => {
          this.setState({
            sellOrders: this.state.sellOrders.concat([sellOrders])
          });
        });
      });
  }

  delayedOrders() {
    axios
      .get(
        `https://poloniex.com/public?command=returnOrderBook&currencyPair=${this
          .props.pair}`
      )
      .then(responseData => {
        this.setState({
          sellOrders: responseData.data.asks,
          buyOrders: responseData.data.bids
        });
      });
  }

  refreshTrades() {
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
    try {
      const value = await AsyncStorage.getItem("delayed");
      if (value !== null) {
        let val = value == "true";
        this.setState({ delayed: val });
      }
    } catch (error) {
      console.error(error);
    }

    switch (this.state.delayed) {
      case true:
        let v;
        let w;
        try {
          v = await this.refreshTrades();
          w = await this.delayedOrders();
        } catch (error) {
          console.error(error);
        }
        setInterval(() => {
          //this.refreshTrades(); //to be uncommented
          // this.delayedOrders();
          console.log("refreshed both");
        }, 5000);
        break;
      case false:
        this.realtimeOrders();
        let x;
        try {
          x = await this.refreshTrades();
        } catch (error) {
          console.error(error);
        }
        setInterval(() => {
          //this.refreshTrades(); //to be uncommented
          console.log("refreshed trades");
        }, 5000);
        break;
    }
  }

  formatted(item) {
    let result;
    switch (this.state.delayed) {
      case true:
        result = (
          <Body>
            <Text>Amount: {item[1]} {this.props.base}</Text>
            <Text note>Price: {item[0]} {this.props.quote}</Text>
          </Body>
        );
        break;
      case false:
        result = JSON.stringify(item);
        break;
    }
    return result;
  }

  buysell(type) {
    let result;
    switch (type) {
      case "buy":
        result = { color: "green" };
        break;
      case "sell":
        result = { color: "#7b1111" };
        break;
    }
    return result;
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
                {this.formatted(item)}
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
                {this.formatted(item)}
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
                <Body>
                  <Text>Amount: {item.amount} {this.props.base} </Text>
                  <Text>Price: {item.rate} {this.props.quote} </Text>
                  <Text>Total: {item.total} {this.props.quote} </Text>
                  <Text>Date: {item.date} </Text>
                </Body>
                <Right>
                  <Text style={this.buysell(item.type)}>
                    {`${item.type.charAt(0).toUpperCase()}${item.type.slice(
                      1,
                      item.type.length
                    )}`}
                  </Text>
                </Right>
              </ListItem>}
          />
          <View style={styles.border} />
        </Card>

        <Text style={{ fontSize: 7 }}> Enable realtime order updates</Text>
        <Text style={{ fontSize: 6, color: "#7b1111" }}>
          {" "}Warning: Enabling realtime order updates may terminate the
          functioning of this app.
        </Text>
        <Switch
          disabled={true}
          onValueChange={async value => {
            try {
              await this.setState({ delayed: value });
            } catch (error) {
              console.error(error);
            }
            try {
              await AsyncStorage.setItem("delayed", `${value}`);
            } catch (error) {
              console.error(error);
            }
          }}
          value={this.state.delayed}
        />
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
//total
//appstate
//listview
//top spacing
//error
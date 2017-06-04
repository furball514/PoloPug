import React from "react";
import { View, Text } from "react-native";
import Pusher from "pusher-js/react-native";
import Views from "./pageviews";
import axios from "axios";

export default class Page extends React.Component {
  state = {
    tickerData: {
      currencyPair: this.props.pair,
      last: "loading...",
      lowestAsk: this.props.lowestAsk,
      highestBid: this.props.highestBid,
      percentChange: this.props.percentChange,
      baseVolume: this.props.baseVolume,
      quoteVolume: this.props.quoteVolume,
      isFrozen: 0,
      high: this.props.high,
      low: this.props.low
    },
    base: this.props.base,
    quote: this.props.quote,
    buyOrders: [],
    sellOrders: [],
    tradeHistory: []
  };

  componentWillMount() {
    Pusher.logToConsole = true;
    const pusher = new Pusher("fcd289e4102c38a00414", {
      encrypted: true
    });
    const channel = pusher.subscribe(this.props.pair);
    channel.bind("ticker", tickerData => {
      this.setState({ tickerData });
    });
    this.refresh();
    this.autoRefresh();
  }

  componentDidMount() {
    Pusher.logToConsole = true;
    const pusher = new Pusher("fcd289e4102c38a00414", {
      encrypted: true
    });
    axios
      .get(`https://bright-element.glitch.me/orders/${this.props.pair}`)
      .then(() => {
        const orderChannel = pusher.subscribe("channel");
        orderChannel.bind("buyorders", buyOrders => {
          this.setState({ buyOrders: this.state.buyOrders.push(buyOrders) });
        });
        orderChannel.bind("sellorders", sellOrders => {
          this.setState({ sellOrders: this.state.sellOrders.push(sellOrders) });
        });
      });
  }

  refresh() {
    axios
      .get(
        `https://poloniex.com/public?command=returnTradeHistory&currencyPair=${this.props.pair}`
      )
      .then(responseData => {
        this.setState({ tradeHistory: responseData.data });
      });
  }
  
  autoRefresh() {
    setInterval(this.refresh,3000);
  }

  render() {
    return (
      <Views
        tickerData={this.state.tickerData}
        base={this.state.base}
        quote={this.state.quote}
        buyOrders={this.state.buyOrders}
        sellOrders={this.state.sellOrders}
        tradeHistory={this.state.tradeHistory}
      />
    );
  }
}

/*
        <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text> {JSON.stringify(this.state.tickerData)} </Text>
      </View>
      */

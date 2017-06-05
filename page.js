import React from "react";
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
    quote: this.props.quote
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
  }

  render() {
    return (
      <Views
        tickerData={this.state.tickerData}
        base={this.state.base}
        quote={this.state.quote}
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

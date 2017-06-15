import React from "react";
import Pusher from "pusher-js/react-native";
import { Views } from "./pageviews";
import axios from "axios";
import { AppState } from "react-native";

const pusher = new Pusher("fcd289e4102c38a00414", {
  encrypted: true
});

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
    mount: true,
    appState: AppState.currentState
  };

  componentWillMount() {
    Pusher.logToConsole = true;
    const channel = pusher.subscribe(this.props.pair);
    channel.bind("ticker", tickerData => {
      this.setState({ tickerData });
    });
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState === "active" &&
      nextAppState.match(/inactive|background/)
    ) {
      this.setState({ mount: false });
      pusher.disconnect();
      console.log("background");
    }
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.setState({ mount: true });
      pusher.connect();
      console.log("foreground");
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    let mountViews = this.state.mount
      ? <Views
          tickerData={this.state.tickerData}
          base={this.state.base}
          quote={this.state.quote}
        />
      : null;
    return mountViews;
  }
}


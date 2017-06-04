import React from "react";
import { Text, View } from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Content,
  List,
  ListItem,
  Right,
  Icon,
  Body,
  Button,
  Fab,
  Thumbnail
} from "native-base";

/**
 * 
 * 
 * @export
 * @class Exchangeoverview
 * @extends {React.Component}
 */

export default class Exchangeoverview extends React.Component {
  state = {
    dataBtc: [],
    dataEth: [],
    dataXmr: [],
    dataUsdt: [],
    show: "btc",
    active: false
  };

  componentDidMount() {
    axios.get("https://poloniex.com/public?command=returnTicker").then(data => {
      let pairsData = {
        toBtc: [],
        toEth: [],
        toXmr: [],
        toUsdt: []
      };

      for (let name in data.data) {
        let value = data.data[name];
        switch (name.slice(0, 3)) {
          case "BTC":
            value.pair = name;
            pairsData.toBtc.push(value);
            break;
          case "ETH":
            value.pair = name;
            pairsData.toEth.push(value);
            break;
          case "XMR":
            value.pair = name;
            pairsData.toXmr.push(value);
            break;
          case "USD":
            value.pair = name;
            pairsData.toUsdt.push(value);
            break;
        }
      }

      this.setState({
        dataBtc: pairsData.toBtc,
        dataEth: pairsData.toEth,
        dataXmr: pairsData.toXmr,
        dataUsdt: pairsData.toUsdt
      });
    });
  }

  colorAssign(change) {
    let result;
    switch (change.charAt(0)) {
      case "-":
        result = { color: "#f44336" };
        break;
      default:
        result = { color: "lightgreen" };
        break;
    }
    return result;
  }

  show() {
    if (this.state.show === "btc") {
      return this.state.dataBtc;
    } else if (this.state.show === "xmr") {
      return this.state.dataXmr;
    } else if (this.state.show === "eth") {
      return this.state.dataEth;
    } else if (this.state.show === "usdt") {
      return this.state.dataUsdt;
    }
  }

  roundOff(change) {
    let result;
    switch (change.charAt(0)) {
      case "-":
        result = change.replace(
          change.substr(change.indexOf(".") + 3, change.length),
          ""
        );
        break;
      default:
        result = `+${change.replace(change.substr(change.indexOf(".") + 3, change.length), "")}`;
        break;
    }
    return result;
  }

  render() {
    return (
      <Container>
        <Container>
          <Content>
            <List
              dataArray={this.show()}
              renderRow={pair => (
                <ListItem
                  button
                  onPress={() =>
                    Actions.page({
                      pair: pair.pair,
                      last: pair.last,
                      percentChange: pair.percentChange,
                      baseVolume: pair.baseVolume,
                      quoteVolume: pair.quoteVolume,
                      high: pair.high,
                      low: pair.low,
                      highestBid: pair.highestBid,
                      lowestAsk: pair.lowestAsk,
                      base: pair.pair.slice(
                        pair.pair.indexOf("_") + 1,
                        pair.pair.length
                      ),
                      quote: pair.pair.slice(0, pair.pair.indexOf("_"))
                    })}
                >
                  <Body>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {pair.pair.slice(
                        pair.pair.indexOf("_") + 1,
                        pair.pair.length
                      )}
                    </Text>
                    <Text note style={{ color: "white" }}>
                      {" "}
                      {`Price: ${pair.last} ${this.state.show.toUpperCase()}`}
                      {" "}
                    </Text>
                    <Text note style={{ color: "white" }}>
                      {" "}
                      {`Vol: ${pair.baseVolume} ${this.state.show.toUpperCase()}`}
                      {" "}
                    </Text>
                  </Body>
                  <Right>
                    <Text style={this.colorAssign(pair.percentChange)}>
                      {" "}
                      {this.roundOff(pair.percentChange)}
                      {" "}
                    </Text>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              )}
            />
          </Content>
        </Container>
        <View>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ marginLeft: 10 }}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon name="menu" />
            <Button
              style={{ backgroundColor: "white" }}
              onPress={() => {
                this.setState({ show: "btc" });
              }}
            >
              <Thumbnail source={require("./btc.png")} small size={400} />
            </Button>
            <Button
              style={{ backgroundColor: "black" }}
              onPress={() => {
                this.setState({ show: "xmr" });
              }}
            >
              <Thumbnail source={require("./xmr.png")} small size={500} />
            </Button>
            <Button style={{ backgroundColor: "white" }}>
              <Thumbnail
                source={require("./usd.png")}
                small
                size={20}
                onPress={() => {
                  this.setState({ show: "usdt" });
                }}
              />
            </Button>
            <Button
              style={{ backgroundColor: "#DD5144" }}
              onPress={() => {
                this.setState({ show: "eth" });
              }}
            >
              <Thumbnail source={require("./eth.png")} />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}

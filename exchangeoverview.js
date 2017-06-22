import React from "react";
import { Text, View, RefreshControl } from "react-native";
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
  Thumbnail,
  Input,
  Item
} from "native-base";

export default class Exchangeoverview extends React.Component {
  state = {
    dataBtc: [],
    dataEth: [],
    dataXmr: [],
    dataUsdt: [],
    show: "btc",
    active: false,
    refreshing: false,
    activeTwo: false,
    text: ""
  };

  getData() {
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

  componentDidMount() {
    this.getData();
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    axios
      .get("https://poloniex.com/public?command=returnTicker")
      .then(data => {
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
        console.log("refreshed");
      })
      .then(() => {
        this.setState({ refreshing: false });
        console.log(this.state.refreshing);
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
    } else if (this.state.show === "btcReverse") {
      return [].concat(this.state.dataBtc).reverse();
    } else if (this.state.show === "xmrReverse") {
      return [].concat(this.state.dataXmr).reverse();
    } else if (this.state.show === "ethReverse") {
      return [].concat(this.state.dataEth).reverse();
    } else if (this.state.show === "usdtReverse") {
      return [].concat(this.state.dataUsdt).reverse();
    } else if (this.state.show === "btcVolume") {
      return []
        .concat(this.state.dataBtc)
        .sort((a, b) => b.baseVolume - a.baseVolume);
    } else if (this.state.show === "xmrVolume") {
      return []
        .concat(this.state.dataXmr)
        .sort((a, b) => b.baseVolume - a.baseVolume);
    } else if (this.state.show === "ethVolume") {
      return []
        .concat(this.state.dataEth)
        .sort((a, b) => b.baseVolume - a.baseVolume);
    } else if (this.state.show === "usdtVolume") {
      return []
        .concat(this.state.dataUsdt)
        .sort((a, b) => b.baseVolume - a.baseVolume);
    } else if (this.state.show === "btcVolumeReverse") {
      return []
        .concat(this.state.dataBtc)
        .sort((a, b) => a.baseVolume - b.baseVolume);
    } else if (this.state.show === "xmrVolumeReverse") {
      return []
        .concat(this.state.dataXmr)
        .sort((a, b) => a.baseVolume - b.baseVolume);
    } else if (this.state.show === "ethVolumeReverse") {
      return []
        .concat(this.state.dataEth)
        .sort((a, b) => a.baseVolume - b.baseVolume);
    } else if (this.state.show === "usdtVolumeReverse") {
      return []
        .concat(this.state.dataUsdt)
        .sort((a, b) => a.baseVolume - b.baseVolume);
    } else if (this.state.show === "btcChange") {
      return []
        .concat(this.state.dataBtc)
        .sort((a, b) => b.percentChange - a.percentChange);
    } else if (this.state.show === "xmrChange") {
      return []
        .concat(this.state.dataXmr)
        .sort((a, b) => b.percentChange - a.percentChange);
    } else if (this.state.show === "ethChange") {
      return []
        .concat(this.state.dataEth)
        .sort((a, b) => b.percentChange - a.percentChange);
    } else if (this.state.show === "usdtChange") {
      return []
        .concat(this.state.dataUsdt)
        .sort((a, b) => b.percentChange - a.percentChange);
    } else if (this.state.show === "btcChangeReverse") {
      return []
        .concat(this.state.dataBtc)
        .sort((a, b) => a.percentChange - b.percentChange);
    } else if (this.state.show === "xmrChangeReverse") {
      return []
        .concat(this.state.dataXmr)
        .sort((a, b) => a.percentChange - b.percentChange);
    } else if (this.state.show === "ethChangeReverse") {
      return []
        .concat(this.state.dataEth)
        .sort((a, b) => a.percentChange - b.percentChange);
    } else if (this.state.show === "usdtChangeReverse") {
      return []
        .concat(this.state.dataUsdt)
        .sort((a, b) => a.percentChange - b.percentChange);
    } else if (this.state.show === "btcPrice") {
      return [].concat(this.state.dataBtc).sort((a, b) => b.last - a.last);
    } else if (this.state.show === "xmrPrice") {
      return [].concat(this.state.dataXmr).sort((a, b) => b.last - a.last);
    } else if (this.state.show === "ethPrice") {
      return [].concat(this.state.dataEth).sort((a, b) => b.last - a.last);
    } else if (this.state.show === "usdtPrice") {
      return [].concat(this.state.dataUsdt).sort((a, b) => b.last - a.last);
    } else if (this.state.show === "btcPriceReverse") {
      return [].concat(this.state.dataBtc).sort((a, b) => a.last - b.last);
    } else if (this.state.show === "xmrPriceReverse") {
      return [].concat(this.state.dataXmr).sort((a, b) => a.last - b.last);
    } else if (this.state.show === "ethPriceReverse") {
      return [].concat(this.state.dataEth).sort((a, b) => a.last - b.last);
    } else if (this.state.show === "usdtPriceReverse") {
      return [].concat(this.state.dataUsdt).sort((a, b) => a.last - b.last);
    } else if (this.state.show === "search") {
      let results = [];
      results = this.state.dataBtc
        .filter(obj => obj.pair.indexOf(this.state.text) != -1)
        .concat(
          this.state.dataEth.filter(
            obj => obj.pair.indexOf(this.state.text) != -1
          )
        )
        .concat(
          this.state.dataXmr.filter(
            obj => obj.pair.indexOf(this.state.text) != -1
          )
        )
        .concat(
          this.state.dataUsdt.filter(
            obj => obj.pair.indexOf(this.state.text) != -1
          )
        );
      return results;
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
        result = `+${change.replace(
          change.substr(change.indexOf(".") + 3, change.length),
          ""
        )}`;
        break;
    }
    return result;
  }

  reverseSort() {
    switch (this.state.show) {
      case "btc":
        this.setState({ show: "btcReverse" });
        break;
      case "xmr":
        this.setState({ show: "xmrReverse" });
        break;
      case "eth":
        this.setState({ show: "ethReverse" });
        break;
      case "usdt":
        this.setState({ show: "usdtReverse" });
        break;

      case "btcVolume":
        this.setState({ show: "btcVolumeReverse" });
        break;
      case "xmrVolume":
        this.setState({ show: "xmrVolumeReverse" });
        break;
      case "ethVolume":
        this.setState({ show: "ethVolumeReverse" });
        break;
      case "usdtVolume":
        this.setState({ show: "usdtVolumeReverse" });
        break;

      case "btcChange":
        this.setState({ show: "btcChangeReverse" });
        break;
      case "xmrChange":
        this.setState({ show: "xmrChangeReverse" });
        break;
      case "ethChange":
        this.setState({ show: "ethChangeReverse" });
        break;
      case "usdtChange":
        this.setState({ show: "usdtChangeReverse" });
        break;

      case "btcPrice":
        this.setState({ show: "btcPriceReverse" });
        break;
      case "xmrPrice":
        this.setState({ show: "xmrPriceReverse" });
        break;
      case "ethPrice":
        this.setState({ show: "ethPriceReverse" });
        break;
      case "usdtPrice":
        this.setState({ show: "usdtPriceReverse" });
        break;

      case "btcReverse":
        this.setState({ show: "btc" });
        break;
      case "xmrReverse":
        this.setState({ show: "xmr" });
        break;
      case "ethReverse":
        this.setState({ show: "eth" });
        break;
      case "usdtReverse":
        this.setState({ show: "usdt" });
        break;

      case "btcVolumeReverse":
        this.setState({ show: "btcVolume" });
        break;
      case "xmrVolumeReverse":
        this.setState({ show: "xmrVolume" });
        break;
      case "ethVolumeReverse":
        this.setState({ show: "ethVolume" });
        break;
      case "usdtVolumeReverse":
        this.setState({ show: "usdtVolume" });
        break;

      case "btcChangeReverse":
        this.setState({ show: "btcChange" });
        break;
      case "xmrChangeReverse":
        this.setState({ show: "xmrChange" });
        break;
      case "ethChangeReverse":
        this.setState({ show: "ethChange" });
        break;
      case "usdtChangeReverse":
        this.setState({ show: "usdtChange" });
        break;

      case "btcPriceReverse":
        this.setState({ show: "btcPrice" });
        break;
      case "xmrPriceReverse":
        this.setState({ show: "xmrPrice" });
        break;
      case "ethPriceReverse":
        this.setState({ show: "ethPrice" });
        break;
      case "usdtPriceReverse":
        this.setState({ show: "usdtPrice" });
        break;

      default:
        this.setState({ show: "btc" });
        break;
    }
  }

  priceSort() {
    switch (this.state.show) {
      case "btc":
        this.setState({ show: "btcPrice" });
        break;
      case "xmr":
        this.setState({ show: "xmrPrice" });
        break;
      case "usdt":
        this.setState({ show: "usdtPrice" });
        break;
      case "eth":
        this.setState({ show: "ethPrice" });
        break;

      case "btcVolume":
        this.setState({ show: "btcPrice" });
        break;
      case "xmrVolume":
        this.setState({ show: "xmrPrice" });
        break;
      case "usdtVolume":
        this.setState({ show: "usdtPrice" });
        break;
      case "ethVolume":
        this.setState({ show: "ethPrice" });
        break;

      case "btcChange":
        this.setState({ show: "btcPrice" });
        break;
      case "xmrChange":
        this.setState({ show: "xmrPrice" });
        break;
      case "usdtChange":
        this.setState({ show: "usdtPrice" });
        break;
      case "ethChange":
        this.setState({ show: "ethPrice" });
        break;

      case "btcPrice":
        this.setState({ show: "btcPrice" });
        break;
      case "xmrPrice":
        this.setState({ show: "xmrPrice" });
        break;
      case "usdtPrice":
        this.setState({ show: "usdtPrice" });
        break;
      case "ethPrice":
        this.setState({ show: "ethPrice" });
        break;

      case "btcVolumeReverse":
        this.setState({ show: "btcPrice" });
        break;
      case "xmrVolumeReverse":
        this.setState({ show: "xmrPrice" });
        break;
      case "usdtVolumeReverse":
        this.setState({ show: "usdtPrice" });
        break;
      case "ethVolumeReverse":
        this.setState({ show: "ethPrice" });
        break;

      case "btcReverse":
        this.setState({ show: "btcPrice" });
        break;
      case "xmrReverse":
        this.setState({ show: "xmrPrice" });
        break;
      case "usdtReverse":
        this.setState({ show: "usdtPrice" });
        break;
      case "ethReverse":
        this.setState({ show: "ethPrice" });
        break;

      case "btcChangeReverse":
        this.setState({ show: "btcPrice" });
        break;
      case "xmrChangeReverse":
        this.setState({ show: "xmrPrice" });
        break;
      case "usdtChangeReverse":
        this.setState({ show: "usdtPrice" });
        break;
      case "ethChangeReverse":
        this.setState({ show: "ethPrice" });
        break;

      case "btcPriceReverse":
        this.setState({ show: "btcPriceReverse" });
        break;
      case "xmrPriceReverse":
        this.setState({ show: "xmrPriceReverse" });
        break;
      case "usdtPriceReverse":
        this.setState({ show: "usdtPriceReverse" });
        break;
      case "ethPriceReverse":
        this.setState({ show: "ethPriceReverse" });
        break;

      default:
        this.setState({ show: "btc" });
        break;
    }
  }

  changeSort() {
    switch (this.state.show) {
      case "btc":
        this.setState({ show: "btcChange" });
        break;
      case "xmr":
        this.setState({ show: "xmrChange" });
        break;
      case "usdt":
        this.setState({ show: "usdtChange" });
        break;
      case "eth":
        this.setState({ show: "ethChange" });
        break;

      case "btcVolume":
        this.setState({ show: "btcChange" });
        break;
      case "xmrVolume":
        this.setState({ show: "xmrChange" });
        break;
      case "usdtVolume":
        this.setState({ show: "usdtChange" });
        break;
      case "ethVolume":
        this.setState({ show: "ethChange" });
        break;

      case "btcChange":
        this.setState({ show: "btcChange" });
        break;
      case "xmrChange":
        this.setState({ show: "xmrChange" });
        break;
      case "usdtChange":
        this.setState({ show: "usdtChange" });
        break;
      case "ethChange":
        this.setState({ show: "ethChange" });
        break;

      case "btcPrice":
        this.setState({ show: "btcChange" });
        break;
      case "xmrPrice":
        this.setState({ show: "xmrChange" });
        break;
      case "usdtPrice":
        this.setState({ show: "usdtChange" });
        break;
      case "ethPrice":
        this.setState({ show: "ethChange" });
        break;

      case "btcVolumeReverse":
        this.setState({ show: "btcChange" });
        break;
      case "xmrVolumeReverse":
        this.setState({ show: "xmrChange" });
        break;
      case "usdtVolumeReverse":
        this.setState({ show: "usdtChange" });
        break;
      case "ethVolumeReverse":
        this.setState({ show: "ethChange" });
        break;

      case "btcReverse":
        this.setState({ show: "btcChange" });
        break;
      case "xmrReverse":
        this.setState({ show: "xmrChange" });
        break;
      case "usdtReverse":
        this.setState({ show: "usdtChange" });
        break;
      case "ethReverse":
        this.setState({ show: "ethChange" });
        break;

      case "btcChangeReverse":
        this.setState({ show: "btcChangeReverse" });
        break;
      case "xmrChangeReverse":
        this.setState({ show: "xmrChangeReverse" });
        break;
      case "usdtChangeReverse":
        this.setState({ show: "usdtChangeReverse" });
        break;
      case "ethChangeReverse":
        this.setState({ show: "ethChangeReverse" });
        break;

      case "btcPriceReverse":
        this.setState({ show: "btcChange" });
        break;
      case "xmrPriceReverse":
        this.setState({ show: "xmrChange" });
        break;
      case "usdtPriceReverse":
        this.setState({ show: "usdtChange" });
        break;
      case "ethPriceReverse":
        this.setState({ show: "ethChange" });
        break;

      default:
        this.setState({ show: "btc" });
        break;
    }
  }

  volumeSort() {
    switch (this.state.show) {
      case "btc":
        this.setState({ show: "btcVolume" });
        break;
      case "xmr":
        this.setState({ show: "xmrVolume" });
        break;
      case "usdt":
        this.setState({ show: "usdtVolume" });
        break;
      case "eth":
        this.setState({ show: "ethVolume" });
        break;

      case "btcVolume":
        this.setState({ show: "btcVolume" });
        break;
      case "xmrVolume":
        this.setState({ show: "xmrVolume" });
        break;
      case "usdtVolume":
        this.setState({ show: "usdtVolume" });
        break;
      case "ethVolume":
        this.setState({ show: "ethVolume" });
        break;

      case "btcChange":
        this.setState({ show: "btcVolume" });
        break;
      case "xmrChange":
        this.setState({ show: "xmrVolume" });
        break;
      case "usdtChange":
        this.setState({ show: "usdtVolume" });
        break;
      case "ethChange":
        this.setState({ show: "ethVolume" });
        break;

      case "btcPrice":
        this.setState({ show: "btcVolume" });
        break;
      case "xmrPrice":
        this.setState({ show: "xmrVolume" });
        break;
      case "usdtPrice":
        this.setState({ show: "usdtVolume" });
        break;
      case "ethPrice":
        this.setState({ show: "ethVolume" });
        break;

      case "btcVolumeReverse":
        this.setState({ show: "btcVolumeReverse" });
        break;
      case "xmrVolumeReverse":
        this.setState({ show: "xmrVolumeReverse" });
        break;
      case "usdtVolumeReverse":
        this.setState({ show: "usdtVolumeReverse" });
        break;
      case "ethVolumeReverse":
        this.setState({ show: "ethVolumeReverse" });
        break;

      case "btcReverse":
        this.setState({ show: "btcVolume" });
        break;
      case "xmrReverse":
        this.setState({ show: "xmrVolume" });
        break;
      case "usdtReverse":
        this.setState({ show: "usdtVolume" });
        break;
      case "ethReverse":
        this.setState({ show: "ethVolume" });
        break;

      case "btcChangeReverse":
        this.setState({ show: "btcVolume" });
        break;
      case "xmrChangeReverse":
        this.setState({ show: "xmrVolume" });
        break;
      case "usdtChangeReverse":
        this.setState({ show: "usdtVolume" });
        break;
      case "ethChangeReverse":
        this.setState({ show: "ethVolume" });
        break;

      case "btcPriceReverse":
        this.setState({ show: "btcVolume" });
        break;
      case "xmrPriceReverse":
        this.setState({ show: "xmrVolume" });
        break;
      case "usdtPriceReverse":
        this.setState({ show: "usdtVolume" });
        break;
      case "ethPriceReverse":
        this.setState({ show: "ethVolume" });
        break;

      default:
        this.setState({ show: "btc" });
        break;
    }
  }

  render() {
    return (
      <Container>
        <Container>
          <Content
            style={{ marginTop: 10 }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this._onRefresh();
                }}
              />
            }
          >
            <Item rounded>
              <Icon style={{ color: "lightgrey" }} name="search" />
              <Input
                style={{ color: "lightgrey" }}
                placeholder="Search"
                placeholderTextColor="lightgrey"
                autoCapitalize="characters"
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                onSubmitEditing={e => {
                  this.setState({ show: "search" });
                }}
                returnKeyType="go"
              />
            </Item>
            <List
              dataArray={this.show()}
              renderRow={pair =>
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
                      {`Price: ${pair.last} ${pair.pair.slice(
                        0,
                        pair.pair.indexOf("_")
                      )}`}
                      {" "}
                    </Text>
                    <Text note style={{ color: "white" }}>
                      {" "}
                      {`Vol: ${pair.baseVolume} ${pair.pair.slice(
                        0,
                        pair.pair.indexOf("_")
                      )}`}
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
                </ListItem>}
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
            <Button
              style={{ backgroundColor: "green" }}
              onPress={() => {
                this.setState({ show: "usdt" });
              }}
            >
              <Thumbnail source={require("./usd.png")} small size={20} />
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

          <Fab
            active={this.state.activeTwo}
            direction="right"
            containerStyle={{ marginLeft: 10 }}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomLeft"
            onPress={() => this.setState({ activeTwo: !this.state.activeTwo })}
          >
            <Icon name="keypad" />
            <Button
              style={{ backgroundColor: "lightblue" }}
              onPress={() => {
                this.reverseSort();
              }}
            >
              <Thumbnail
                source={require("./reverse.png")}
                small
                style={{ width: 20, height: 20 }}
              />
            </Button>
            <Button
              style={{ backgroundColor: "darkred" }}
              onPress={() => {
                this.priceSort();
              }}
            >
              <Thumbnail
                source={require("./price.png")}
                small
                style={{ width: 20, height: 20 }}
              />
            </Button>
            <Button
              style={{ backgroundColor: "green" }}
              onPress={() => {
                this.changeSort();
              }}
            >
              <Thumbnail source={require("./change.png")} small size={25} />
            </Button>
            <Button
              style={{ backgroundColor: "yellow" }}
              onPress={() => {
                this.volumeSort();
              }}
            >
              <Thumbnail
                source={require("./volume.png")}
                small
                style={{ width: 20, height: 20 }}
              />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}

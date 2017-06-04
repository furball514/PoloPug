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
  Footer
} from "native-base";

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
        result = `+${change.replace(change.substr(change.indexOf(".") + 3, change.length), "")}`;
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
                {"    "}
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
                uri: `https://bright-element.glitch.me/charts/${this.props.tickerData.currencyPair}`
              }}
              style={{ height: 500, alignSelf: "stretch" }}
            />
          </Card>
          <View style={styles.border} />

          <Card>
            <List
              dataArray={this.props.buyOrders}
              renderRow={item => (
                <ListItem>
                  <Body> <Text> {item} </Text> </Body>
                </ListItem>
              )}
            />
          </Card>
          <View style={styles.border} />

          <Card>
            <List
              dataArray={this.props.sellOrders}
              renderRow={item => (
                <ListItem>
                  <Body> <Text> {item} </Text> </Body>
                </ListItem>
              )}
            />
          </Card>
          <View style={styles.border} />

          <Card>
            <List
              dataArray={this.props.tradeHistory}
              renderRow={item => <ListItem />}
            />
          </Card>
          <View style={styles.border} />

          <Footer>
            {" "}<Text> {JSON.stringify(this.props.tickerData)} </Text>{" "}
          </Footer>
        </Content>
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
  }
});

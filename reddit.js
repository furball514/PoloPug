import React from "react";
import { Text, View, WebView } from "react-native";
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
  Icon,
  H3,
  Footer
} from "native-base";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import Loading from "./loading";

/**
 * 
 * 
 * @export
 * @class Reddit
 * @extends {React.Component}
 */

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
    this.fetchData();
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

/**
 * 
 * 
 * @class RedditViews
 * @extends {React.Component}
 */

class RedditViews extends React.Component {
  show() {
    if (this.props.crypto == true && this.props.show === "hot") {
      return this.props.cryptocurrency.hot;
    } else if (this.props.crypto == true && this.props.show === "new") {
      return this.props.cryptocurrency.new;
    } else if (this.props.crypto == true && this.props.show === "top") {
      return this.props.cryptocurrency.top;
    } else if (this.props.crypto == true && this.props.show === "rising") {
      return this.props.cryptocurrency.rising;
    } else if (
      this.props.crypto == true &&
      this.props.show === "controversial"
    ) {
      return this.props.cryptocurrency.controversial;
    } else if (this.props.crypto == false && this.props.show === "hot") {
      return this.props.poloniex.hot;
    } else if (this.props.crypto == false && this.props.show === "new") {
      return this.props.poloniex.new;
    } else if (this.props.crypto == false && this.props.show === "top") {
      return this.props.poloniex.top;
    } else if (this.props.crypto == false && this.props.show === "rising") {
      return this.props.poloniex.rising;
    } else if (
      this.props.crypto == false &&
      this.props.show === "controversial"
    ) {
      return this.props.poloniex.controversial;
    }
  }

  colorAssign(author) {
    if (author === "AutoModerator")
      return { color: "lightgreen", fontSize: 10 };
    else return { color: "lightgrey", fontSize: 10 };
  }

  render() {
    return (
      <View style={{ backgroundColor: "#212121", marginTop: 10 }}>
        <List
          dataArray={this.show()}
          renderRow={item =>
            <ListItem
              button
              onPress={() => {
                Actions.reddit({
                  item: item,
                  colorAssign: this.colorAssign
                });
              }}
            >
              <Body>
                <Text>
                  <Text style={this.colorAssign(item.data.author)}>
                    u/{item.data.author}
                  </Text>
                  <Text>{"      "}</Text>
                  <Text style={{ color: "lightgrey", fontSize: 10 }}>
                    {new Date(item.data.created_utc * 1000).toString()}
                  </Text>
                </Text>
                <Text
                  note
                  style={{ color: "white", marginBottom: 10, marginTop: 10 }}
                >
                  {" "}{item.data.title}
                  {" "}
                </Text>
                <Text note>
                  <Text style={{ color: "lightgrey", fontSize: 10 }}>
                    Score: {item.data.score}
                  </Text>
                  <Text>{"        "}</Text>
                  <Text style={{ color: "lightgrey", fontSize: 10 }}>
                    Replies: {item.data.num_comments}
                  </Text>
                  <Text>{"        "}</Text>
                  <Text
                    style={{
                      color: "lightblue",
                      fontSize: 10,
                      textDecorationLine: "underline"
                    }}
                    onPress={() => {
                      Actions.redditweb({
                        url: `https://www.reddit.com${item.data.permalink}`
                      });
                    }}
                  >
                    Link
                  </Text>
                </Text>
              </Body>
              <Right>
                <Thumbnail square source={{ uri: item.data.thumbnail }} />
                <Text>{"  "}</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>}
        />
      </View>
    );
  }
}

/**
 * 
 * 
 * @export
 * @class RedditOpen
 * @extends {React.Component}
 */

export class RedditOpen extends React.Component {
  returnFlair(flair) {
    if (flair !== null)
      return (
        <Text
          style={{
            color: "orangered",
            backgroundColor: "maroon",
            fontSize: 10,
            width: 60,
            marginTop: 10
          }}
        >
          {flair}
        </Text>
      );
  }

  returnPreview() {
    if (this.props.item.data.preview) {
      return (
        <View style={{ alignSelf: "center" }}>
          <Thumbnail
            source={{ uri: this.props.item.data.preview.images[0].source.url }}
            style={{ height: 450, width: 450 }}
            square
          />
        </View>
      );
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#212121", marginTop: 50 }}>
        <Content>
          <Text
            style={{ alignSelf: "stretch", marginLeft: 20, marginRight: 10 }}
          >
            <Text style={{ color: "lightgrey", fontSize: 10 }}>
              {this.props.item.data.subreddit_name_prefixed}
            </Text>
            <Text>{"                 "}</Text>
            <Text style={this.props.colorAssign(this.props.item.data.author)}>
              u/{this.props.item.data.author}
            </Text>
          </Text>
          {this.returnFlair(this.props.item.data.link_flair_text)}
          <H3 style={{ color: "white", marginBottom: 15, marginTop: 15 }}>
            {this.props.item.data.title}
          </H3>
          <View>
            <Text style={{ color: "white" }}>
              {this.props.item.data.selftext}
            </Text>
            {this.returnPreview()}
          </View>
          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: 1,
              marginTop: 15
            }}
          />
          <Text style={{ alignSelf: "center" }}>
            <Text style={{ color: "lightgrey", fontSize: 10 }}>
              Score: {this.props.item.data.score}
            </Text>
            <Text>{"          "}</Text>
            <Text style={{ color: "lightgrey", fontSize: 10 }}>
              Replies: {this.props.item.data.num_comments}
            </Text>
            <Text>{"          "}</Text>
            <Text
              style={{
                color: "lightblue",
                fontSize: 10,
                textDecorationLine: "underline"
              }}
              onPress={() => {
                Actions.redditweb({
                  url: this.props.item.data.url
                });
              }}
            >
              Link
            </Text>
          </Text>
          <View style={{ borderBottomColor: "white", borderBottomWidth: 1 }} />
          <H3
            style={{
              color: "lightblue",
              textDecorationLine: "underline",
              marginTop: 50,
              marginBottom: 50,
              alignSelf: "center"
            }}
            onPress={() => {
              Actions.redditweb({
                url: `https://www.reddit.com${this.props.item.data.permalink}`
              });
            }}
          >
            {" "}Open In Web{" "}
          </H3>
        </Content>
        <View>
          <Footer>
            <Text style={{ color: "lightgrey", fontSize: 10 }}>
              {" "}
              {new Date(this.props.item.data.created_utc * 1000).toString()}
            </Text>
          </Footer>
        </View>
      </Container>
    );
  }
}

export class RedditWeb extends React.Component {
  render() {
    return (
      <WebView
        source={{ uri: this.props.url }}
        renderLoading={() => <Loading />}
        style={{ height: 900, alignSelf: "stretch" }}
      />
    );
  }
}

//test
//refreshcontrol

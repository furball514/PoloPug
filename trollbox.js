import React from "react";
import { StyleSheet, Text, Linking, View, WebView } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Right,
  Header,
  Icon,
  Button
} from "native-base";
import axios from "axios";
import { Actions } from "react-native-router-flux";

export class Troll extends React.Component {
  state = {
    data: []
  };

  refresh() {
    axios
      .get("https://poloniex.com/public?command=getTrollboxMessages")
      .then(responseData => {
        this.setState({
          data: this.state.data.concat([responseData.data])
        });
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
    }, 3000);
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "red" }}>
          <Text style={{ color: "white" }}>
            TrollBox has been disabled by Poloniex
          </Text>
        </Header>
        <Content>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Button
              onPress={e => {
                Linking.openURL(
                  "https://join.slack.com/trollboxonepoloniex/shared_invite/MTk0ODg2MzI2MzIyLTE0OTY5NDE4ODMtYTBmMDBhZmNmMg"
                ).catch(err => {
                  console.error(err);
                });
              }}
            >
              <Icon name="navigate" />
              <Text
                style={{
                  fontSize: 14,
                  color: "lightblue"
                }}
              >
                Slack Invite
              </Text>
            </Button>
            <Button
              onPress={() => {
                Actions.troll();
              }}
            >
              <Icon name="chatboxes" />
              <Text
                style={{
                  fontSize: 14,
                  color: "lightblue"
                }}
              >
                Sign In
              </Text>
            </Button>
          </View>
          <View>
            <List
              dataArray={this.state.data}
              renderRow={msg =>
                <ListItem>
                  <Text style={{ color: "white" }}>
                    {JSON.stringify(msg)}
                  </Text>
                </ListItem>}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export class TrollSigned extends React.Component {
  state = {
    signedIn: false
  };

  render() {
    const signedIn = (
      <Container>
        <WebView
          source={{
            uri: "https://trollboxonepoloniex.slack.com/messages"
          }}
          style={{ height: 500, alignSelf: "stretch" }}
        />
      </Container>
    );
    const signedOut = (
      <Container>
        <Text>{"   "}</Text>
        <Text>{"   "}</Text>
        <Text
          style={{
            fontSize: 14,
            color: "blue",
            textDecorationLine: "underline"
          }}
          onPress={() => {
            this.setState({ signedIn: true });
          }}
        >
          {" "}Go To Chatbox
          {" "}
        </Text>
        <WebView
          source={{
            uri: "https://trollboxonepoloniex.slack.com/"
          }}
          style={{ height: 500, alignSelf: "stretch" }}
        />
      </Container>
    );
    let renderWhich = this.state.signedIn ? signedIn : signedOut;
    return renderWhich;
  }
}

const styles = StyleSheet.create({
  web: {
    height: 900,
    alignSelf: "stretch"
  }
});

/*function initWebSocketsForTrollbox(){if(newWebSockets)return initWebSocketsForTrollbox_new();var n="wss://api.poloniex.com";isLocal&&(n="wss://pushstaging.poloniex.com"),window.connection=new autobahn.Connection({url:n,realm:"realm1"}),window.connection.onopen=function(n){n.subscribe("trollbox",trollboxEvent)},window.connection.onclose=function(){},window.connection.open()}function initWebSocketsForTrollbox_new(){webSocketConnected||(webSocketConnected=!0,window.conn=new WebSocket("wss://api2.poloniex.com"),window.conn.onopen=function(n){this.send(JSON.stringify({command:"subscribe",channel:1001}))},window.conn.onmessage=function(n){var o=JSON.parse(n.data);switch(o[0]){case 1001:trollboxEvent(o)}},window.conn.onerror=function(n){},window.conn.onclose=function(n){webSocketConnected=!1,setTimeout(initWebSockets_new,2e3)})}var webSocketConnected=!1;
<WebView
style={styles.web}
source={{uri:"https://www.poloniex.com/trollbox"}}<Body><Text style={{color:"white"}}>{msg.message}</Text></Body><Right><Text><Text style={{color:"white"}}>{msg.username}</Text><Text style={{color:"white"}}>{msg.reputation}</Text></Text></Right>
*/
//slacks
//useragent
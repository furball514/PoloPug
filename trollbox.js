import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Right,
  Header
} from "native-base";
import axios from "axios";

export default class Troll extends React.Component {
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
          <List
            dataArray={this.state.data}
            renderRow={msg =>
              <ListItem>
                <Text style={{color: "white"}}>
                  {JSON.stringify(msg)}
                </Text>
              </ListItem>}
          />
        </Content>
      </Container>
    );
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
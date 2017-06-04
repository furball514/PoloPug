import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { Container, Header, Content, Button } from "native-base";
import axios from "axios";

export default class Margin extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.getData('BTC');
  }

  getData(currency) {
    axios
      .get(
        `https://poloniex.com/public?command=returnLoanOrders&currency=${currency}`
      )
      .then(data => {
        this.setState({
          data: JSON.stringify(data.data)
        });
      });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "yellow" }}>
          <Text style={styles.text}> Coming Soon </Text>
        </Header>
        <Content>
          <TextInput
            style={styles.content}
            onSubmitEditing={currency => {
              this.getData(currency);
            }}
            returnKeyType="go"
            autoCapitalize="characters"
            maxLength={5}
          />
          <Text style={styles.content}> {this.state.data} </Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontStyle: "italic"
  },
  content: {
    color: "white"
  }
});

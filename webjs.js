import React from "react";
import { StyleSheet, WebView, Linking, Text } from "react-native";
import { Container } from "native-base";
import Loading from "./loading";

export default class Web extends React.Component {
  render() {
    return (
      <Container>
        <WebView
          source={{ uri: "https://m.poloniex.com" }}
          style={styles.web}
          renderLoading={() => <Loading />}
        />
        <Text
          style={{
            fontSize: 14,
            color: "lightblue",
            textDecorationLine: "underline"
          }}
          onPress={e => {
            Linking.openURL("https://m.poloniex.com").catch(err => {
              console.error(err);
            });
          }}
        >
          {" "}Open in browser
          {" "}
        </Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  web: {
    alignSelf: "stretch",
    height: 900
  },
  text: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline"
  }
});
//browser link

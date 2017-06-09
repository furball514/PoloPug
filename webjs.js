import React from "react";
import { StyleSheet, WebView, Linking, Text, View } from "react-native";

export default class Web extends React.Component {
  render() {
    return (
      <WebView source={{ uri: "https://m.poloniex.com" }} style={styles.web} />
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
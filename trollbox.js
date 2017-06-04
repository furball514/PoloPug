import React from "react";
import { StyleSheet, WebView } from "react-native";

export default class Troll extends React.Component {
  render() {
    return <WebView style={styles.web} source={{ uri: "https://www.poloniex.com/trollbox" }} />;
  }
}

const styles = StyleSheet.create({
  web: {
    alignSelf: "stretch",
    height: 900
  }
});

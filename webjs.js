import React from "react";
import { StyleSheet, WebView, Linking, Text } from "react-native";

export default class Web extends React.Component {
  render() {
    return (
      <View>
        <Text
          style={styles.text}
          onPress={e => {
            Linking.openURL("https://m.poloniex.com").catch(err => {
              console.error(err);
            });
          }}
        >
          {" "}Open in browser
          {" "}
        </Text>
        <WebView
          source={{ uri: "https://m.poloniex.com" }}
          style={styles.web}
        />
      </View>
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

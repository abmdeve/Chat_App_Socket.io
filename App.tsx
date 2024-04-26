import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GlobalState from "./context";
import Navigator from "./routes/navigator";

export default function App() {
  return (
    <GlobalState>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
      <StatusBar hidden={true} />
    </GlobalState>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

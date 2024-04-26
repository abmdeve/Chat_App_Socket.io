import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParamsList } from "../types/navigation";
import ChatScreen from "../../screens/ChatScreen";
import HomeScreen from "../../screens/HomeScreen";
import MessageScreen from "../../screens/MessageScreen";

const Stack = createNativeStackNavigator<MainStackParamsList>();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;

const styles = StyleSheet.create({});

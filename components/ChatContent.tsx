import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { GlobalContext } from "../context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamsList } from "../routes/types/navigation";

export interface ChatContentProps {
  item: object;
}

const ChatContent = ({ item }: ChatContentProps) => {
  const { messages, setMessages } = useContext(GlobalContext);
  const navigation = useNavigation();

  useEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  const handdleNavigateToMessageScreeen = () => {
    navigation.navigate("MessageScreen", {
      currentGroupName: item.currentGroupName,
      id: item.id,
    });
  };

  return (
    <Pressable onPress={handdleNavigateToMessageScreeen} style={styles.chat}>
      <View style={styles.circle}>
        <FontAwesome name="group" size={24} color={"black"} />
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text>{item.currentGroupName} </Text>
          <Text>
            {messages?.text ? messages.text : "Tap to start messaging"}{" "}
          </Text>
        </View>
        <View>
          <Text>{messages?.time ? messages.time : "Now "}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatContent;

const styles = StyleSheet.create({
  chat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    marginRight: 10,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  username: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    opacity: 0.8,
  },
  time: {
    opacity: 0.6,
  },
});

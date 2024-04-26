import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { GlobalContext } from "../context";
import ChatContent from "../components/ChatContent";
import NewGroupModal from "../components/NewGroupModal";
import { socket } from "../utils/host";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamsList } from "../routes/types/navigation";

const ChatScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamsList>) => {
  const {
    currentUser,
    allChatRooms,
    setAllChatRooms,
    modalVisible,
    setModalVisible,
    setCurrentUser,
    setShowLoginView,
  } = useContext(GlobalContext);

  useEffect(() => {
    socket.emit("getAllGroups");
    console.log("useEffect");
    socket.on("groupList", (groups) => {
      console.log("groups", groups);
      setAllChatRooms(groups);
    });
  }, [socket]);

  const handleLogout = () => {
    setCurrentUser("");
    setShowLoginView(false);
  };

  useEffect(() => {
    if (currentUser.trim() === "") navigation.navigate("HomeScreen");
  }, [currentUser]);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Welcom {currentUser}! </Text>
          <Pressable onPress={handleLogout}>
            <AntDesign name="logout" size={30} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.listContainer}>
        {allChatRooms && allChatRooms.length > 0 ? (
          <FlatList
            data={allChatRooms}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ChatContent item={item} />}
          />
        ) : null}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>Create New Group</Text>
          </View>
        </Pressable>
      </View>
      {/* MODAL COMPONENT */}
      {modalVisible && <NewGroupModal />}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: "#eee",
    flex: 1,
  },
  topContainer: {
    backgroundColor: "white",
    height: 70,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    marginBottom: 15,
    flex: 0.3,
  },
  listContainer: {
    flex: 3.4,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#703efe",
    padding: 12,
    width: "100%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context";
import { socket } from "../utils/host";

const NewGroupModal = () => {
  const {
    modalVisible,
    setModalVisible,
    currentGroupName,
    setCurrentGroupName,
  } = useContext(GlobalContext);

  const handleCreateNewRoom = () => {
    console.log("currentGroupName", currentGroupName);

    socket.emit("createNewGroup", currentGroupName);

    setModalVisible(false);
    setCurrentGroupName("");
    Keyboard.dismiss();
  };

  // socket.on('connection', (socket: Socket))

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            autoCorrect={false}
            placeholder="Enter your group name"
            style={styles.loginInput}
            value={currentGroupName}
            onChangeText={(text: string) => setCurrentGroupName(text)}
          />
          <View style={styles.buttonWrapper}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.button}
            >
              <View>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </Pressable>
            <Pressable onPress={handleCreateNewRoom} style={styles.button}>
              <View>
                <Text style={styles.buttonText}>Add</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewGroupModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#703efe",
    padding: 15,
    marginVertical: 10,
    width: "34%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 30,
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    borderRadius: 50,
  },
  loginInput: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 10,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

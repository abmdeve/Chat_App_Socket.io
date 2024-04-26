import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamsList } from "../routes/types/navigation";

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamsList>) => {
  const {
    showLoginView,
    setShowLoginView,
    setCurrentUserName,
    currentUserName,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUser,
  } = useContext(GlobalContext);

  const handleRegisterAndSignIn = (isLogin: boolean) => {
    if (currentUserName.trim() !== "") {
      const index = allUsers.findIndex(
        (userItem: any) => userItem === currentUserName
      );

      if (isLogin) {
        if (index === -1) {
          alert("Please register first");
        } else {
          setCurrentUserName(currentUserName);
        }
      } else {
        if (index === -1) {
          allUsers.push(currentUserName);
          setAllUser(allUsers);
          setCurrentUser(currentUserName);
        } else {
          alert("Already registered ! Please login");
        }
      }
      setCurrentUserName("");
    } else {
      alert("USER NAME FIELD IS EMPTY");
    }

    Keyboard.dismiss();
  };

  useEffect(() => {
    if (currentUser.trim() !== "") navigation.navigate("ChatScreen");
  }, [currentUser]);

  // console.log("allUsers", allUsers);

  return (
    <View style={styles.miniWrapper}>
      <ImageBackground
        source={require("../assets/home-image.jpg")}
        style={styles.homeImage}
      />
      <View style={styles.content}>
        {showLoginView ? (
          <View style={styles.infoBlock}>
            <View style={styles.loginInputContainer}>
              <Text style={styles.heading}>Enter Your User Name</Text>
              <TextInput
                autoCorrect={false}
                placeholder="Enter your uesr name"
                style={styles.loginInput}
                value={currentUserName}
                onChangeText={(text: string) => setCurrentUserName(text)}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={() => handleRegisterAndSignIn(false)}
                style={styles.button}
              >
                <View>
                  <Text style={styles.buttonText}>Register</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => handleRegisterAndSignIn(true)}
                style={styles.button}
              >
                <View>
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.infoBlock}>
            <Text>Connect, Grow and Inspire</Text>
            <Text>Connect, people around the world for free</Text>
            <Pressable
              style={styles.button}
              onPress={() => setShowLoginView(true)}
            >
              <View>
                <Text style={styles.buttonText}>Get Started</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  miniWrapper: {
    flex: 1,
  },
  homeImage: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  infoBlock: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 15,
    color: "#acacac",
    marginBottom: 15,
  },
  loginInput: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#703efe",
    padding: 15,
    marginVertical: 10,
    width: "34%",
    elevation: 1,
    borderRadius: 50,
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
  loginInputContainer: {},
});

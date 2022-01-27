import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import firebase from "firebase";
import { StyleSheet, View, Text } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAS6tr5cBKniUScISF2hvgtFBBlikPbgcE",
  authDomain: "instagram-dev-pranav.firebaseapp.com",
  projectId: "instagram-dev-pranav",
  storageBucket: "instagram-dev-pranav.appspot.com",
  messagingSenderId: "192653288074",
  appId: "1:192653288074:web:22ffcbbf2192947fd84373",
  measurementId: "G-BHMH6N7S9K",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import Register from "./components/auth/Register";

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }}>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>User is logged in</Text>
      </View>
    );
  }
}

export default App;

import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Button,
  LogBox,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function Save(props) {
  //   console.log(props.route.params.image);
  LogBox.ignoreLogs(["Setting a timer"]);
  const [caption, setCaption] = useState("");

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creationDate: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        props.navigation.popToTop();
      });
  };

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    console.log(childPath);

    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = () => {
      console.log(
        `transferred: ${
          (task.snapshot.bytesTransferred / task.snapshot.totalBytes) * 100
        }%`
      );
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };
  return (
    <View style={style.container}>
      <Image source={{ uri: props.route.params.image }} style={style.image} />
      <TextInput
        placeholder="Write a Caption.."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 300,
  },
});

import firebase from "firebase";
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from "../constants/index";

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          // console.log(snapshot.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("User doesnot exist");
        }
      });
  };
}

export function fetchUserPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creationDate", "desc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {
            id,
            ...data,
          };
        });
        // console.log(posts);
        dispatch({ type: USER_POSTS_STATE_CHANGE, currentUser: posts });
      });
  };
}

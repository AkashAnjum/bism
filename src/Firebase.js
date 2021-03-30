// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyBn6Ow6Fkik6GYPHU0I6V7VF8dayXzywEg",
    authDomain: "example-d5590.firebaseapp.com",
    databaseURL: "https://example-d5590-default-rtdb.firebaseio.com",
    projectId: "example-d5590",
    storageBucket: "example-d5590.appspot.com",
    messagingSenderId: "908042243063",
    appId: "1:908042243063:web:4862fbb161648b1c29bcf2",
    measurementId: "G-MD55PMJKVJ"
  };
  
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const db = firebase.firestore();

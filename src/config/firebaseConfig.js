import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCaD4R_9JAieMd4xjMxH2BlUoHFi8eytxo",
    authDomain: "react-redux-firebase-bp-2019.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-bp-2019.firebaseio.com",
    projectId: "react-redux-firebase-bp-2019",
    storageBucket: "react-redux-firebase-bp-2019.appspot.com",
    messagingSenderId: "659095613230"
};

firebase.initializeApp(config);

export default firebase;
'use strict';
import React from 'react-native';
import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD02RrpKFbJT-8pzQkXXOsl5s6wD_6GG68",
  authDomain: "andsquare-b6817.firebaseapp.com",
  databaseURL: "https://andsquare-b6817.firebaseio.com",
  storageBucket: "andsquare-b6817.appspot.com",
  messagingSenderId: "352894422212"
};

Firebase.initializeApp(firebaseConfig);

module.exports = Firebase;

'use strict';
import React from 'react-native';
import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "[Your API key]",
  authDomain: "[Your URL]",
  databaseURL: "[Your DB URL]",
  storageBucket: "[Your storage URL]",
  messagingSenderId: "[Your ID]"
};

Firebase.initializeApp(firebaseConfig);

module.exports = Firebase;

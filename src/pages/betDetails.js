'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  ListView,
  BackAndroid,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

import Button from '../components/button.js';
import Header from '../components/header.js';
import makeHash from '../components/makeHash.js';
import styles from '../styles/common-styles.js';
import Firebase from '../components/firebase.js';
import fetchBlob from 'react-native-fetch-blob';

export default class viewBets extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.navigator.getCurrentRoutes().length > 1) {
        this.props.navigator.pop()
        return true;
      } else {
        return false;
      }
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', () => {
      if (this.props.navigator.getCurrentRoutes().length > 1) {
        this.props.navigator.pop()
        return true;
      } else {
        return false;
      }
    });
  }

  render() {
    return (

    );
  }

}

AppRegistry.registerComponent('betDetails', () => betDetails);

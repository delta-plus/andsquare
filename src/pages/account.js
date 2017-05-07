'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  BackAndroid,
  AsyncStorage
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';
import Login from './login';
import makeHash from '../components/makeHash.js';
import newBet from './newBet';
import viewBets from './viewBets';
import currentBets from './currentBets';
import styles from '../styles/common-styles.js';
import Firebase from '../components/firebase.js';
import FCM from 'react-native-fcm';

export default class account extends Component {

  constructor(props){

    super(props);

    this.state = {
      loaded: false,
    }

  }

  componentDidMount() {

    FCM.getFCMToken().then(token => {
        console.log(token)
    });

    this.refreshTokenListener = FCM.on('refreshToken', (token) => {
      console.log(token)
      // fcm token may not be available on first load, catch it here
    });

    async function subscribe() {
      const user_email = await AsyncStorage.getItem('user_email');
      FCM.subscribeToTopic('/topics/'+makeHash(user_email).toString().replace("-","_"));
    };

    subscribe();

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

  render(){

    this.state = {
      loaded: true,
    }

    return (
      <View style={styles.container}>
        <Header text="Account" loaded={this.state.loaded} />  
        <View style={styles.body}>
              <Button
                  text="Create Bet"
                  onpress={this.createBet.bind(this)}
                  button_styles={styles.button}
                  button_text_styles={styles.button_text} />
              <Button
                  text="Resolve Bets"
                  onpress={this.logout.bind(this)}
                  button_styles={styles.button}
                  button_text_styles={styles.button_text} />
              <Button
                  text="Browse Bets"
                  onpress={this.viewBets.bind(this)}
                  button_styles={styles.button}
                  button_text_styles={styles.button_text} />
              <Button
                  text="Current Bets"
                  onpress={this.currentBets.bind(this)}
                  button_styles={styles.button}
                  button_text_styles={styles.button_text} />
              <Button
                  text="Logout"
                  onpress={this.logout.bind(this)}
                  button_styles={styles.button}
                  button_text_styles={styles.button_text} />
        </View>
      </View>
    );
  }

  createBet() {
    // alert(user_data.token);
    this.props.navigator.push({
      component: newBet
    });
  }

  viewBets() {
    this.props.navigator.push({
      component: viewBets
    });
  }

  currentBets() {
    this.props.navigator.push({
      component: currentBets
    });
  }

  logout() {

    AsyncStorage.removeItem('user_data').then(() => {    
      Firebase.auth().signOut();
      this.props.navigator.push({
        component: Login
      });
    });

  }

}

AppRegistry.registerComponent('account', () => account);

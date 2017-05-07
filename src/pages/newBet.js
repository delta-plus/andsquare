'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  dismissKeyboard,
  BackAndroid,
  AsyncStorage
} from 'react-native';

import DismissKeyboard from 'dismissKeyboard';
import Toast from 'react-native-smart-toast';
import Button from '../components/button';
import Header from '../components/header';
import Firebase from '../components/firebase.js';
import makeHash from '../components/makeHash.js';
import FCM from 'react-native-fcm';
import styles from '../styles/common-styles.js';

export default class login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      wager: '',
      position: '',
      ID: 1,
      loaded: true
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
    return (
      <View style={styles.container}>
        <Header text="Make a New Bet" loaded={this.state.loaded} />
        <View style={styles.body}>
          <Text style={styles.description}>Enter the email address of the person you'd like to bet against. Then, enter your wager.</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({wager: text})}
            value={this.state.wager}
            placeholder={"0"}
          />
          <TextInput
            style={styles.multiline}
            onChangeText={(text) => this.setState({position: text})}
            value={this.state.position}
            placeholder={"Briefly state your position on the bet here."}
            multiline={true}
            numberOfLines={1}
            maxLength={450}
          />
          <Button
            text="Submit"
            onpress={this.submit.bind(this)}
            //onpress={this.showTopToast}
            button_styles={styles.button}
            button_text_styles={styles.button_text}/>
          <Toast
            ref={ component => this._toast = component }
            marginTop={64}>
            Bet request sent.
          </Toast>
        </View>
      </View>
    );
  }

  showTopToast = () => {
    this._toast.show({
      position: Toast.constants.gravity.center,
    })
  }

  async submit() {

    const user_email = await AsyncStorage.getItem('user_email');
    const emailhash = makeHash(this.state.email).toString().replace("-","_");
    const today = new Date().toDateString();
    const db1 = Firebase.database().ref("notificationRequests");

    db1.push().set({
      username: emailhash,
      message: 'New bet from ' + user_email
    });

    const db2 = Firebase.database().ref(emailhash);
    db2.push().set({ 
      date: today,
      position: this.state.position,
      wager: this.state.wager,
      user: user_email, 
      ID: user_email + this.state.ID
    });

    this.setState({
      ID: this.state.ID + 1
    });

  }

}

AppRegistry.registerComponent('newBet', () => newBet);

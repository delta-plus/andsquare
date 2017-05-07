'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Image,
  TextInput,
  View,
  dismissKeyboard,
  AsyncStorage
} from 'react-native';

import DismissKeyboard from 'dismissKeyboard';
import Button from '../components/button';
import Header from '../components/header';
import Signup from './signup';
import Account from './account';
import Firebase from '../components/firebase.js';
import styles from '../styles/common-styles.js';

export default class login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Header text="Login" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />

          <Button
            text="Login"
            onpress={this.login.bind(this)}
            button_styles={styles.button}
            button_text_styles={styles.button_text}
          />

          <Button
            text="Create Account"
            onpress={this.goToSignup.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text}
          />
          <Image source={require('../assets/andsquare.jpeg')}
                 style={{height: 400, width: 400}}/>
        </View>
      </View>
    );
  }

  async login(){

    this.setState({
      loaded: false
    });

    DismissKeyboard();

    try {
      await Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
      Firebase.auth().currentUser.getToken().then(data => AsyncStorage.setItem('user_data', JSON.stringify(data)));
      AsyncStorage.setItem('user_email', this.state.email);
      this.props.navigator.push({
        component: Account
      });

    } catch (error) {
      alert(error.toString());
    }

    this.setState({
      email: '',
      password: '',
      loaded: true
    });
  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }

}

AppRegistry.registerComponent('login', () => login);

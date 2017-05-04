'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  BackAndroid,
  dismissKeyboard
} from 'react-native';

import DismissKeyboard from 'dismissKeyboard';
import Button from '../components/button';
import Header from '../components/header';
import Login from './login';
import Firebase from '../components/firebase.js';
import styles from '../styles/common-styles.js';

export default class signup extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
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

  async signup(){

    this.setState({
      loaded: false
    });

      DismissKeyboard();

      try {
        await Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

        alert("Account created");
        this.props.navigator.push({
          component: Login
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

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
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
            text="Signup"
            onpress={this.signup.bind(this)}
            button_styles={styles.button}
            button_text_styles={styles.button_text}/>

          <Button
            text="Return to Login"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);

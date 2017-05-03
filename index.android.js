'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  BackAndroid,
  AsyncStorage
} from 'react-native';

import Login from './src/pages/login';
import Signup from './src/pages/signup';
import Account from './src/pages/account';
import Header from './src/components/header';
import Firebase from './src/components/firebase';
import FCM from 'react-native-fcm';
import styles from './src/styles/common-styles.js';

class andsquare extends Component {    

  constructor(props) {
    super(props);

    this.state = {
      component: null,
      loaded: false
    };
  }

  componentWillMount() {

/* Optional SSO

    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      if (user_data != null) {
        Firebase.authWithCustomToken(user_data.token, (error, authData) => {
          if(error){
            this.setState({component: Login});
          }else{
            this.setState({component: Account});
          }
        });
      } else {
        this.setState({component: Login});
      }
    }); */

    this.setState({component: Login});

  }

  render() {
  
    if (this.state.component) {
      return (
        <Navigator
          initialRoute = {{component: this.state.component}}
          configureScene = { () => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene = { (route, navigator) => {
            if (route.component) {
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    }else{
      return (
        <View style={styles.container}>
          <Header text="Andsquare" loaded={this.state.loaded}/>  
          <View style={styles.body}></View>
        </View>
      );
    }

  }

}

AppRegistry.registerComponent('andsquare', () => andsquare);

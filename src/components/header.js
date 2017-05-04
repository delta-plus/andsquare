'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class header extends Component {

  render(){
    return (
      <View style={styles.header}>
        <View style={styles.header_item}>
          <Text style={styles.header_text}>{this.props.text}</Text>
        </View>
        <View style={styles.header_item}>
        {  !this.props.loaded &&
          <ActivityIndicator
            animating={true}
            size='small'
            color='lime'/>
        }
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    flex: 1
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10
  },
  header_text: {
    color: '#000',
    fontSize: 18
  }
});

AppRegistry.registerComponent('header', () => header);

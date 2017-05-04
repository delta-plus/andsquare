'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
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

export default class viewBets extends Component {

  constructor(props){
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,
                                        sectionHeaderHasChanged: (s1, s2) => s1 !== s2});

    this.state = {
      loaded: false,
      dataSource: ds.cloneWithRowsAndSections([]),
      check: -1
    }
  }

  async setValues() {
    const userEmail = await AsyncStorage.getItem('user_email');
    const emailHash = makeHash(userEmail).toString().replace("-","_");
    const userDB = Firebase.database().ref(emailHash + 2);
    userDB.on('value', (snap) => {
      let dataBlob = [];
      snap.forEach(function(child) {
        if (!dataBlob[child.val().user]) {
          // Create an entry in the map for the category if it hasn't yet been created
          dataBlob[child.val().user] = [];
        }
        dataBlob[child.val().user].push({set: child.val(), key: child.key});
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob),
        userDB: userDB,
        loaded: true
      });

    });
  }

  componentDidMount() {
    this.setValues();
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

  display(ID) {
    this.setState({
      check: ID,
    });
  }

  viewDetails() {

  }

  cancel() {
    this.setState({
      check: -1,
    });
  }

  delete(key) {
    this.state.userDB.child(key).remove();
    this.setState({
      check: -1,
    });
  }

  renderRow(rowData) {
    return (
            <View style={{marginBottom: 15}}>
              <Text onPress={this.display.bind(this, rowData.set.ID)}
                    style={{color: 'green',
                    marginLeft: 10, 
                    marginRight: 10,
                    borderBottomWidth: 1, 
                    borderBottomColor: 'green',
                    borderTopWidth: 1,
                    borderTopColor: 'green'}}>
                {rowData.set.date}
              </Text>
              <Text onPress={this.display.bind(this, rowData.set.ID)}
                    style={{color: 'limegreen', marginLeft: 10, marginRight: 10}}>
                {rowData.set.position}
              </Text>
              <Text style={{marginLeft: 10, marginRight: 10}}
                    onPress={this.display.bind(this, rowData.set.ID)}>
                <Text style={{color: 'green'}}>
                  Offered By: </Text>
                <Text style={{color: 'limegreen'}}>
                  {rowData.set.offerer}
                </Text>
              </Text>
              <Text style={{marginLeft: 10, marginRight: 10}}
                    onPress={this.display.bind(this, rowData.set.ID)}>
                <Text style={{color: 'green'}}>
                  Amount: </Text>
                <Text style={{color: 'limegreen'}}>
                  {rowData.set.wager}
                </Text>
              </Text>
              { Boolean(this.state.check == rowData.set.ID) &&
                <View style={{flexDirection: 'row'}}>
                  <Button onpress = {this.viewDetails.bind(this)}
                          text='Details'
                          button_styles={styles.button2}
                          button_text_styles={styles.button_text}/>
                  <Button onpress = {this.cancel.bind(this)}
                          text='Cancel'
                          button_styles={styles.button2}
                          button_text_styles={styles.button_text}/>
                  <Button onpress = {this.delete.bind(this, rowData.key)}
                          text='Delete'
                          button_styles={styles.button3}
                          button_text_styles={styles.button_text}/>
                </View>
              }
            </View>
           );
  }

  render(){
    return (
      <View style={styles.container}>
        <Header text="Current Bets" loaded={this.state.loaded} />  
        <View style={styles.body}>
          <View>
            <ListView dataSource={this.state.dataSource}
                      renderRow={(rowData) => this.renderRow(rowData)}
                      renderSectionHeader={(sectionData, sectionID) => 
                        <View>
                          <Text style={styles.sectionHeader}>
                            {sectionID}
                          </Text>
                        </View>
                      }
                      style={{flex: 1}}/>
          </View>
        </View>
      </View>
    );
  }

}

AppRegistry.registerComponent('viewBets', () => viewBets);

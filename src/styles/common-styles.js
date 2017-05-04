'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 9,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textinput: {
    height: 40,
    width: 300,
    borderColor: 'green',
    // textDecorationColor: 'limegreen',
    borderWidth: 1
  },
  multiline: { 
    height: 300, 
    // fontSize: 16, 
    width: 300,
    padding: 8, 
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'green',
    // textDecorationColor: 'limegreen',
    borderWidth: 1,
    textAlignVertical: 'top'
  },
  transparent_button: {
    marginTop: 5,
    padding: 5,
    borderRadius: 10
  },
  transparent_button_text: {
    color: 'green',
    fontSize: 16
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: 200,
    backgroundColor: 'green'
  },
  button2: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 10,
    width: 100,
    backgroundColor: 'green'
  },
  button3: {
    marginVertical: 10,
    marginLeft: 55,
    padding: 5,
    borderRadius: 10,
    width: 100,
    backgroundColor: 'red'
  },
  button_text: {
    textAlign: 'center',
    color: 'white'
  },
  image: {
    width: 100,
    height: 100
  },
  description: {
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  listview: {
    flex: 1,
  },
  sectionHeader: {
    color: 'white',
    textAlign: 'center', 
    backgroundColor: 'green', 
    borderRadius: 5, 
    marginBottom: 10, 
    fontWeight: "700", 
    marginLeft: 10, 
    marginRight: 10, 
    fontSize: 15
  }
});

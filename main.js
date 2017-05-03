import { Meteor } from 'meteor/meteor';

var firebase = require('firebase-admin');
var request = require('request');
var fs = require('fs');

Meteor.startup(() => {
  var API_KEY = "[key]"; // Your Firebase Cloud Messaging Server API key

  // Fetch the service account key JSON file contents
  var serviceAccount = require("./andsquare-firebase-adminsdk.json");

  // Initialize the app with a service account, granting admin privileges
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://andsquare-b6817.firebaseio.com/"
  });
  ref = firebase.database().ref();

  function listenForNotificationRequests() {
    var requests = ref.child('notificationRequests');
    requests.on('child_added', function(requestSnapshot) {
      var request = requestSnapshot.val();
      sendNotificationToUser(
        request.username, 
        request.message,
        function() {
          requestSnapshot.ref.remove();
        }
      );
    }, function(error) {
      console.error(error);
    });
  };

  function sendNotificationToUser(username, message, onSuccess) {
    request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Content-Type' :' application/json',
        'Authorization': 'key='+API_KEY
      },
      body: JSON.stringify({
        notification: {
          title: message
        },
        to : '/topics/'+username
      })
    }, function(error, response, body) {
      if (error) { console.error(error); }
      else if (response.statusCode >= 400) { 
        console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage); 
      }
      else {
        onSuccess();
      }
    });
  }

  // start listening
  listenForNotificationRequests();
});

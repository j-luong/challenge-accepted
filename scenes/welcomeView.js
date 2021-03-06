'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Auth0Lock from 'react-native-lock';

var credentials = require("../environment");
var lock = new Auth0Lock(credentials);
var styles = require("../components/styles");

var WelcomeView = React.createClass({
  render: function() {
    return (
      <View style={styles.containerWelcome}>
        <View style={styles.messageBox}>
          <Image
            style={styles.logo}
            source={ require('../img/logo.png') }
          />
          <Text style={styles.titleWelcome}>Challenge Accepted</Text>
          <Text style={styles.subtitleWelcome}>Bet friends, not computers</Text>
        </View>
        <TouchableHighlight
          style={styles.welcomeButton}
          underlayColor='#949494'
          onPress={this._onLogin}>
          <Text style={styles.welcomeButtonText}>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  },

  _onLogin: function() {
    lock.show({
        closable: true,
      },
      (err, profile, token) => {
        if (err) {
        console.log(err);
        return;
      }
      this.props.navigator.push({
        name: 'Profile',
        passProps: {
          profile: profile,
          token: token,
        }
      });
    });
  },
});

module.exports = WelcomeView;

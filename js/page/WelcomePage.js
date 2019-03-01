/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigatorUtils from '../navigator/NavigatorUtils'

type Props = {};
export default class WelcomePage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WelcomePage</Text>
      </View>
    );
  }

  componentDidMount() {
    const { navigation } = this.props
    this.timer = setTimeout(() => {
      NavigatorUtils.resetToHome({
          navigation: navigation
      })
    },200)
  }

  componentWillUnmount() {
      this.timer&&clearTimeout(this.timer)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

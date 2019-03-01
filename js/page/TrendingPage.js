/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux'
import {themeActions} from '../action'

type Props = {};
class TrendingPage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.home}>TrendingPage</Text>
        <Button
          title='更换主题颜色'
          color='#841584'
          onPress={() => {
            console.log(this.props.theme)
            this.props.handlePress('red')
            // const { navigation } = this.props
            // navigation.setParams({
            //   theme: {
            //     tintColor: 'red',
            //     updateTime: new Date().getTime()
            //   }
            // })
          }}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  home: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const mapStateToProps = (state) => ({
  theme: state.theme.theme
})

const mapDispatchToProps = (dispatch) => ({
  handlePress(theme) {
    dispatch(themeActions.changeTheme(theme))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage)

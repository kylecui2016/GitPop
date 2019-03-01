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
import NavigatorUtils from '../navigator/NavigatorUtils'
import {connect} from 'react-redux'
import {themeActions} from '../action'

type Props = {};
class MyPage extends Component<Props> {
  render() {
    const { tabLabel } = this.props
    return (
      // <View style={styles.container}>
      //   <Text style={styles.home}>MyPage</Text>
      //   <Button
      //     title='更换主题颜色'
      //     color='#841584'
      //     onPress={() => {
      //       this.props.handlePress('#1c8')
      //       // const { navigation } = this.props
      //       // navigation.setParams({
      //       //   theme: {
      //       //     tintColor: '#741584',
      //       //     updateTime: new Date().getTime()
      //       //   }
      //       // })
      //     }}
      //   ></Button>
      // </View>
      <View style={styles.container}>
        <Text>{tabLabel}</Text>
        <Text style={styles.home} onPress={() => {
          NavigatorUtils.goPage({}, 'Detail')
        }}>跳转到详情页</Text>
        <Text style={styles.home} onPress={() => {
          NavigatorUtils.goPage({
            navigation: this.props.navigation
          }, 'FetchDemo')
        }}>跳转到FetchDemo</Text>
        <Text style={styles.home} onPress={() => {
          NavigatorUtils.goPage({
            navigation: this.props.navigation
          }, 'AsyncStorage')
        }}>跳转到AsyncStorage</Text>
        <Text style={styles.home} onPress={() => {
          NavigatorUtils.goPage({
            navigation: this.props.navigation
          }, 'DataStoreDemo')
        }}>跳转到DataStoreDemoPage</Text>
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

const mapDispathToProps = (dispatch) => ({
  handlePress(theme) {
    dispatch(themeActions.changeTheme(theme))
  }
})

export default connect(null, mapDispathToProps)(MyPage)
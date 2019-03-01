/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, BackHandler} from 'react-native';
import NavigatorUtils from '../navigator/NavigatorUtils';
import { NavigationActions } from 'react-navigation';
import DynamicNavigator from '../page/DynamicNavigator'
import {connect} from 'react-redux'

type Props = {};
class HomePage extends Component<Props> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.onBackPress)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress',this.onBackPress)
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props
    if(nav.routes[1].index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }
  render() {
    // Home和Detail是最外层的路由，PopularPage是Home下创建的路由，从PopularPage中跳转Detail(外层路由)时，
    // 获取不到Detail，所以在PopularPage路由创建之前保存外层路由到NavigationUtils
    NavigatorUtils.navigation = this.props.navigation
    return (
      <DynamicNavigator />
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
  nav: state.nav
})

export default connect(mapStateToProps, null)(HomePage)
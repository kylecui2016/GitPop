/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../common/NavigationBar'
import {WebView} from 'react-native'
import NavigatorUtils from '../navigator/NavigatorUtils'

type Props = {};
export default class DetailPage extends Component<Props> {
  constructor(props) {
    super(props)
    const PRE_URL = 'https://github.com/'
    this.params = this.props.navigation.state.params
    const {projectModel} = this.params
    this.state = {
      title: projectModel.fullName,
      canGoBack: false,
      url: `${PRE_URL}${projectModel.fullName}`
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar 
          leftButton={this._leftButton()}
          title={this.state.title}
          rightButton={this._rightButton()}
        />
        <WebView
          ref={(webview) => {this.webview = webview}}
          source={{uri: this.state.url}}
          startInLoadingState={true}
          onNavigationStateChange={(e) => {
            this.onNavigationStateChange(e)
          }}
        />
      </View>
    );
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    })
  }

  _leftButton() {
    return (
      <FontAwesome style={{marginLeft: 30}}
        name={'angle-left'}
        size={30}
        color={'white'}
        onPress={() => {
          if(this.state.canGoBack) {
            this.webview.goBack()
          }else {
            NavigatorUtils.goBack(this.props)
          }
        }}
      />
    )
  }

  _rightButton() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesome style={{marginRight: 10}}
          name={'star-o'}
          size={20}
          color={'white'}
        />
        <FontAwesome style={{marginRight: 10}}
          name={'share-alt'}
          size={20}
          color={'white'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

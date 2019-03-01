/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, Button, View, AsyncStorage } from 'react-native';

type Props = {};
const KEY = 'test_key'
export default class AsyncStoragePage extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }
    }
    render() {
        return (
        <View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => {this.inputValue=text}}
                ></TextInput>
            </View>
            <View style={styles.buttons}>
                <Button
                    title='添加'
                    onPress={() => {
                        this.doSave()
                    }}
                ></Button>
                <Button
                    title='删除'
                    onPress={() => {
                        this.doDelete()
                    }}
                ></Button>
                <Button
                    title='获取'
                    onPress={() => {
                        this.doGet()
                    }}
                ></Button>
            </View>
            <Text>{this.state.showText}</Text>
        </View>
        );
    }
    doSave() {
        AsyncStorage.setItem(KEY, this.inputValue)
    }
    doDelete() {
        AsyncStorage.removeItem(KEY)
    }
    doGet() {
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                showText: value
            })
            error&&console.log(error)
        })
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    flex:1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10
  }
});

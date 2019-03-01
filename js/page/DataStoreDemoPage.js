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
import DataStore from '../expand/dao/DataStore'

type Props = {};
export default class DataStoreDemoPage extends Component<Props> {
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
                    title='获取数据'
                    onPress={() => {
                        this.fetchData()
                    }}
                ></Button>
            </View>
            <Text>{this.state.showText}</Text>
        </View>
        );
    }
    fetchData() {
        const data_store = new DataStore()
        const url = `https://api.github.com/search/repositories?q=${this.inputValue}`
        data_store.fetchData(url).then((response) => {
            this.setState({
                showText: JSON.stringify(response)
            })
        }).catch((e) => {
            console.error(e)
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

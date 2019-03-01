/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, Button, View} from 'react-native';

type Props = {};
export default class FetchDemoPage extends Component<Props> {
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
                    onChangeText={(text) => {this.searchKey=text}}
                ></TextInput>
                <Button
                    title='Fetch数据'
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
        const url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then((response) => {
                if(response.ok) {
                    return response.text()
                }
                throw new Error('网络不可用')
            })
            .then((responseText) => {
                this.setState({
                    showText: responseText
                })
            })
            .catch((e) => {
                this.setState({
                    showText: e.toString()
                })
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
  }
});

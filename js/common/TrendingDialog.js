import React, {Component} from 'react'
import {Modal, View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeSpan from '../model/TimeSpan'

export const TimeSpans = [new TimeSpan('今天', 'since=daily'), new TimeSpan('本周', 'since=weekly'), new TimeSpan('本月', 'since=monthly')]

export default class TrendingDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDialog: false
        }
    }

    show() {
        this.setState({
            showDialog: true
        })
    }

    dismiss() {
        this.setState({
            showDialog: false
        })
    }

    _filterNames() {
        const {onSelect} = this.props
        const timespans = TimeSpans.map((item, index) => {
            return (
                <View
                    key={index}
                    style={styles.filterItem}
                >
                    <TouchableOpacity 
                        style={styles.showText}
                        onPress={() => {onSelect(item)}}
                    >
                        <Text>{item.showText}</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                </View>
            )
        })
        return timespans
    }

    render() {
        return (
            <Modal 
                visible={this.state.showDialog}
                transparent={true}>
                <View 
                    style={styles.container}
                    onPress={() => {this.dismiss()}}
                >
                    <View 
                        style={styles.filterWrapper}>
                        {/* <Text onPress={() => {this.dismiss()}}>aaaaaa</Text> */}
                        <MaterialIcons 
                            name={'arrow-drop-up'}
                            size={30}
                            color={'white'}
                        />
                        <View style={styles.filters}>
                            {this._filterNames()}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    filterWrapper: {
        marginTop: Platform.OS === 'ios' ? 50 : 30,
        alignItems: 'center'
    },
    filters: {
        fontSize: 14,
        color: '#333',
        width: 160,
        marginTop: -15,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: 10
    },
    filterItem: {
        height: 30,
        width: 160
    },
    showText: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

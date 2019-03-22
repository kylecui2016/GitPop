import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ViewUtil {
    static getMenuItem(callback, menu) {
        return ViewUtil.getSettingItem(callback, menu.name, menu.Icons, menu.icon)
    }
    static getSettingItem(callback, name, Icons, icon) {
        return (
            <TouchableOpacity style={styles.item_container} onPress={() => {callback()}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {
                        Icons&&icon ? (
                            <Icons 
                                name={icon}
                                size={16}
                                color={'#888'}
                                style={styles.icon}
                            />
                        ) : <View style={styles.icon_replace}></View>
                    }
                    <Text style={styles.name}>{name}</Text>
                </View>
                <Ionicons 
                    name={'ios-arrow-forward'}
                    size={16}
                    color={'#666'}
                    style={styles.icon_forward}
                />
            </TouchableOpacity>
        )
    }
    static getLeftButton(callback) {
        return (
            <TouchableOpacity
                onPress={() => {callback()}}
                style={{ padding: 8, paddingLeft: 16 }}
            >
                <Ionicons
                    name={'ios-arrow-back'}
                    size={26}
                    style={{ color: '#666' }}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item_container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    icon: {
        marginLeft: 16,
        marginRight: 16,
    },
    icon_replace: {
        width: 16,
        height: 16
    },
    name: {
        fontSize: 17,
        color: '#666'
    },
    icon_forward: {
        marginRight: 20
    }
})
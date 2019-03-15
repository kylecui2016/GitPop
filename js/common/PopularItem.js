import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import HTMLView from 'react-native-htmlview'
import BaseItem from '../common/BaseItem'

export default class PopularItem extends BaseItem {
    render() {
        const {item} = this.props.projectModel
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => {this.props.onSelect()}}
            >
                <Text style={styles.title}>{item.full_name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <View style={styles.bottomContainer}>
                    <View style={styles.author}>
                        <Text>Author:</Text>
                        <Image 
                            style={{width: 20, height: 20, marginLeft: 5}}
                            source={{uri: item.owner.avatar_url}}
                        />
                    </View>
                    <View style={styles.star}>
                        <Text style={{marginRight: 6}}>stars:</Text>
                        <Text>{item.stargazers_count}</Text>
                    </View>
                    {this.renderFavoriteIcon()}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontSize: 16,
        color: '#333'
    },
    desc: {
        fontSize: 14,
        color: '#777'
    },
    meta: {
        fontSize: 12,
        color: '#777'
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    author: {
        flexDirection: 'row',
    },
    star: {
        flexDirection: 'row'
    },
    fav: {
        marginRight: 20
    }
})
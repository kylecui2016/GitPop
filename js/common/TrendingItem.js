import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import HTMLView from 'react-native-htmlview'
import BaseItem from '../common/BaseItem'

export default class TrendingItem extends BaseItem {
    render() {
        const {item} = this.props.projectModel
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => {this.props.onSelect()}}
            >
                <Text style={styles.title}>{item.fullName}</Text>
                <HTMLView
                    value={item.description}
                    stylesheet={styles.desc}
                />
                <HTMLView
                    value={item.meta}
                    stylesheet={styles.meta}
                />
                <View style={styles.bottomContainer}>
                    <View style={styles.contributor}>
                        <Text style={{marginRight: 6}}>contributor:</Text>
                        {
                            item.contributors.map((item, index) => {
                                return (
                                    <Image
                                        source={{uri:item}}
                                        style={{width: 22, height: 22, marginRight: 3}}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </View>
                    <View style={styles.star}>
                        <Text style={{marginRight: 6}}>stars:</Text>
                        <Text>{item.starCount}</Text>
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
    contributor: {
        flexDirection: 'row',
    },
    star: {
        flexDirection: 'row'
    },
    fav: {
        marginRight: 20
    }
})
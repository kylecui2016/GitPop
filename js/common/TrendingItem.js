import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview'

export default class TrendingItem extends Component {
    render() {
        const {data} = this.props
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => {this.props.onPress()}}
            >
                <Text style={styles.title}>{data.fullName}</Text>
                <HTMLView
                    value={data.description}
                    stylesheet={styles.desc}
                />
                <HTMLView
                    value={data.meta}
                    stylesheet={styles.meta}
                />
                <View style={styles.bottomContainer}>
                    <View style={styles.contributor}>
                        <Text style={{marginRight: 6}}>contributor:</Text>
                        {
                            data.contributors.map((item, index) => {
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
                        <Text>{data.starCount}</Text>
                    </View>
                    <View style={styles.fav}>
                        <FontAwesome
                            name={'star-o'}
                            size={24}
                            color={'gray'}
                        />
                    </View>
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
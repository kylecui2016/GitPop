import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { MENU } from '../../../utils/MENU'
import ViewUtil from '../../../utils/ViewUtil'
import NavigatorUtils from '../../../navigator/NavigatorUtils'

export default class UserInfoPage extends Component {
    onClick(menu) {
        let RouteName, params = {}
        switch(menu) {
            case MENU.myFavorites:
                RouteName = 'MyFavorites'
                params.title = '我的收藏'
                break
            case MENU.myComments:
                RouteName = 'MyComments'
                break
            case MENU.myPush:
                RouteName = 'MyPush'
                break
            case MENU.checkMessage:
                RouteName = 'CheckMessage'
                break
            case MENU.help:
                RouteName = 'Help'
                break
            case MENU.feedback:
                RouteName = 'Feedback'
                break
            case MENU.setting:
                RouteName = 'Settings'
                break
        }
        if(RouteName) {
            NavigatorUtils.goPage({...params}, RouteName)
        }
    }

    render() {
        return (
            <ScrollView style={styles.user_container}>
                <TouchableOpacity style={styles.user_top}>
                    <View style={styles.theme_toggle}>
                        <Entypo 
                            name={'light-up'}
                            size={19}
                            color={'gray'}
                        />
                    </View>
                    <View style={styles.info_container}>
                        <Image 
                            style={styles.avatar}
                            source={{uri: 'https://www.popsci.com/sites/popsci.com/files/styles/655_1x_/public/images/2018/08/earth_from_space_hurricane.jpg?itok=yUAbIcb0&fc=50,50'}}
                        />
                        <Text style={styles.nickname}>
                            用户昵称
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{marginTop: 20}}>
                    {this.renderItem(MENU.myFavorites)}
                    {this.renderItem(MENU.myComments)}
                    {this.renderItem(MENU.myPush)}
                    {this.renderItem(MENU.checkMessage)}
                </View>
                <View style={{marginTop: 20}}>
                    {this.renderItem(MENU.help)}
                    {this.renderItem(MENU.feedback)}
                    {this.renderItem(MENU.setting)}
                </View>
                <TouchableOpacity style={styles.logout}>
                    <Text style={styles.logout_text}>退出登录</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    renderItem(menu) {
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu)
    }
}

const styles = StyleSheet.create({
    user_container: {
        // flex: 1,
        backgroundColor: '#f7f6f2'
    },
    user_top: {
        height: 148,
        backgroundColor: '#ebe5d5'
    },
    theme_toggle: {
        alignItems: 'flex-end',
        marginRight: 20,
        marginTop: 20
    },
    info_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 72,
        height: 72,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 36,
    },
    nickname: {
        fontSize: 19,
        color: '#333'
    },
    logout: {
        height: 50,
        marginTop: 40,
        marginBottom: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logout_text: {
        fontSize: 17,
        color: '#333'
    }
})
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import LoginPage from '../page/UserCenter/Auth/Login'
import UserInfoPage from '../page/UserCenter/UserInfo'

export default class UserCenterPage extends Component {
    render() {
        return (
            <View>
                {
                    true ? <UserInfoPage /> : <LoginPage />
                }
            </View>
        )
    }
}
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { 
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'
import UserCenterPage from './UserCenterPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import NavigatorUtils from '../navigator/NavigatorUtils';
import {BottomTabBar} from 'react-navigation-tabs'
import {connect} from 'react-redux'

type Props = {};
const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focuced}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    color={tintColor}
                />
            ),
            tabBarOptions : {
                // activeTintColor: 'red'
            }
        },
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({tintColor, focuced}) => (
                <MaterialIcons
                    name={'trending-up'}
                    size={26}
                    color={tintColor}
                />
            )
        },
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor, focuced}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    color={tintColor}
                />
            )
        },
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focuced}) => (
                <FontAwesome5
                    name={'user'}
                    size={24}
                    color={tintColor}
                />
            )
        },
    },
    UserCenterPage: {
        screen: UserCenterPage,
        navigationOptions: {
            tabBarLabel: '用户中心',
            tabBarIcon: ({tintColor, focuced}) => (
                <FontAwesome5
                    name={'user'}
                    size={24}
                    color={tintColor}
                />
            )
        },
    }
}
class DynamicNavigator extends Component<Props> {
    _tabNavigator() {
        if(this.Tabs) {
            return this.Tabs
        }
        const {
            PopularPage,
            TrendingPage,
            FavoritePage,
            MyPage,
            UserCenterPage
        } = TABS
        const tabs = {
            PopularPage,
            TrendingPage,
            FavoritePage,
            MyPage,
            UserCenterPage
        }
        // PopularPage.navigationOptions.tabBarLabel = '最新'
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
            tabBarComponent: (props) => {
                return <TabBarComponent theme={this.props.theme} {...props}/>
            }
        }))
    }
    render() {
        const Tab = this._tabNavigator()
        return (
            <Tab />
        );
  }
}

class TabBarComponent extends Component {
    // constructor(props) {
    //     super(props)
    //     this.theme = {
    //         tintColor: props.activeTintColor,
    //         updateTime: new Date().getTime()
    //     }
    // }
    render() {
        // const { routes, index } = this.props.navigation.state
        // if(routes[index].params) {
        //     const {theme} = routes[index].params
        //     if(theme&&theme.updateTime > this.theme.updateTime) {
        //         this.theme = theme
        //     }
        // }
        return <BottomTabBar
            {...this.props}
            // activeTintColor={this.theme.tintColor || this.props.activeTintColor}
            activeTintColor={this.props.theme}
        ></BottomTabBar>
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  home: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const mapStateToProps = (state) => ({
    theme: state.theme.theme
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, null)(DynamicNavigator)
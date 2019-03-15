/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux'
import {themeActions} from '../action'
import {trendingActions} from '../action'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import NavigationBar from '../common/NavigationBar'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import TrendingDialog, {TimeSpans} from '../common/TrendingDialog'
import TrendingItem from '../common/TrendingItem'
import NavigatorUtils from '../navigator/NavigatorUtils'
import FavoriteUtil from '../utils/FavoriteUtil'
import {FLAG_STORAGE} from '../expand/dao/DataStore'

type Props = {};

const pageSize = 10

export default class TrendingPage extends Component<Props> {
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.home}>TrendingPage</Text>
  //       <Button
  //         title='更换主题颜色'
  //         color='#841584'
  //         onPress={() => {
  //           console.log(this.props.theme)
  //           this.props.handlePress('red')
  //           // const { navigation } = this.props
  //           // navigation.setParams({
  //           //   theme: {
  //           //     tintColor: 'red',
  //           //     updateTime: new Date().getTime()
  //           //   }
  //           // })
  //         }}
  //       ></Button>
  //     </View>
  //   );
  // }

  constructor(props) {
    super(props)
    this.tabNames = ['All', 'Objective-C', 'C++', 'C', 'JavaScript']
    this.state = {
      timeSpan: TimeSpans[0]
    }
  }

  _tabs() {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`TrendingTab${index}`] = {
        screen: (props) => <TrendingTabPage {...props} labelName={item} timeSpan={this.state.timeSpan}/>,
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs
  }

  _titleView() {
    return (
      <View>
        <TouchableOpacity 
          style={styles.titleView}
          onPress={() => {this.dialog.show()}}
          activeOpacity={0.2}>
          <Text style={styles.filterTitle}>趋势 {this.state.timeSpan.showText}</Text>
          <FontAwesome 
            style={{marginBottom: 5}}
            name={'sort-down'}
            size={20}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
    )
  }

  onSelect(item) {
    this.dialog.dismiss()
    this.setState({
      timeSpan: item
    })
  }

  render() {
    const TopNavigation = createAppContainer(createMaterialTopTabNavigator(this._tabs(),{
      tabBarOptions: {
        upperCaseLabel: false,
        scrollEnabled: true,
        tabStyle: {
          height: 40
        },
        style: styles.tabStyle,
        indicatorStyle: styles.indicatorStyle,
        labelStyle: styles.labelStyle
      }
    }))
    return (
      <Fragment>
        <NavigationBar 
          titleView={this._titleView()}
        />
        {/**createAppContainer不能嵌套到View下 */}
        <TopNavigation />
        <TrendingDialog 
          ref={(dialog) => {
            this.dialog = dialog
          }}
          onSelect={(item) => {this.onSelect(item)}}
        />
      </Fragment>
    )
  }
}

class TrendingTab extends Component<Props> {
  constructor(props) {
    super(props)
    this.storeName = this.props.labelName
    this.timeSpan = this.props.timeSpan
  }

  _store() {
    let store = this.props.trending[this.storeName]
    if(!store) {
      return {
        data: [],
        projectModels: []
      }
    }
    return store
  }

  render() {
    let store = this._store()
    let data = store.projectModels
    const {isLoading} = store
    return <FlatList
      data={data}
      renderItem={({item}) => {
        return (
          <TrendingItem
            projectModel={item}
            onSelect={() => {
              NavigatorUtils.goPage({
                projectModel: item.item
              },'Detail')
            }}
            onFavorite={(item, isFavorite) => {FavoriteUtil.onFavorite(item, isFavorite, FLAG_STORAGE.flag_trending)}}
          />
        )
      }}
      keyExtractor={(item) => '' + item.item.fullName}
      refreshControl={
        <RefreshControl 
          onRefresh={() => {this.loadData()}}
          refreshing={isLoading}
        />
      }
      ListFooterComponent={() => {return this.getFooterIndicator()}}
      onEndReached={() => {
        this.loadMore()
        setTimeout(() => {
          if(this.canLoadMore) {
            this.loadMore()
            this.canLoadMore = false
          }
        }, 100)
      }}
      onEndReachedThreshold={0.1}
      onScrollBeginDrag={() => {
        this.canLoadMore = true
      }}
    />
  }

  getFooterIndicator() {
    return (
      this._store().hideLoadingMore ? null : 
      <View style={styles.indicator_container}>
        <ActivityIndicator 
          size={'small'}
          color={'#678'}
        />
        <Text style={{fontSize: 14}}>正在加载更多...</Text>
      </View> 
    )
  }

  // loadData() {
  //   const KEY = this.storeName
  //   const url = `${URL}${KEY}`
  //   const {onFreshData} = this.props
  //   onFreshData(url, KEY, pageSize)
  // }

  loadData() {
    const {onFreshData} = this.props
    const url = `https://github.com/trending/${this.storeName}?${this.timeSpan.searchText}`
    onFreshData(url, this.storeName,pageSize)
  }

  loadMore() {
    const {onLoadMoreData} = this.props
    const data = this._store().data
    let pageIndex = this._store().pageIndex
    onLoadMoreData(data, this.storeName, ++pageIndex, pageSize)
  }

  componentDidMount() {
    this.loadData()
  }
}

const mapStateToProps = (state) => ({
  trending: state.trending
})

const mapDispatchToProps = (dispatch) => ({
  onFreshData(url, storeName, pageSize) {
    dispatch(trendingActions.onRefreshTrending(url, storeName, pageSize))
  },
  onLoadMoreData(data, storeName, pageIndex, pageSize) {
    dispatch(trendingActions.onLoadMoreTrending(data, storeName, pageIndex, pageSize))
  }
})

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabStyle: {
    backgroundColor: '#678'
  },
  indicatorStyle: {
    backgroundColor: '#fff'
  },
  labelStyle: {
    fontSize: 13
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterTitle: {
    color: 'white',
    marginRight: 5,
    fontSize: 16
  },
  indicator_container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

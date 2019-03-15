/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity, RefreshControl} from 'react-native';
import {connect} from 'react-redux'
import { popularActions } from '../action/index'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { 
  createMaterialTopTabNavigator, 
  createAppContainer // react-navigation 3 需要设置createAppContainer
} from 'react-navigation'
import PopularItem from '../common/PopularItem'
import NavigatorUtils from '../navigator/NavigatorUtils';
import FavoriteUtil from '../utils/FavoriteUtil'
import {FLAG_STORAGE} from '../expand/dao/DataStore'

type Props = {};

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const pageSize = 10

export default class PopularPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.tabNames = ['Java', 'JavaScript', 'Android', 'Ios', 'React', 'React Native', 'Vue']
  }
  _genTabs() {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`PopularTab${index}`] = {
        screen: (props) => {
          return (<PopularTabPage {...props} tabLabel={item} />)
        },
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs
  }
  render() {
    const TopNavigator = createAppContainer(createMaterialTopTabNavigator(
      this._genTabs(),{
        tabBarOptions: {
          upperCaseLabel: false,
          scrollEnabled: true,
          style: {
            backgroundColor: '#678',
            height: 40
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
          tabStyle: styles.tabStyle
        }
      }))
    return <TopNavigator />
  }
}

class PopularTab extends Component<Props> {
  constructor(props) {
    super(props)
    this.storeName = props.tabLabel
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    const {items, projectModels, isLoading} = this._store()
    return (
      <FlatList 
        data = {projectModels}
        renderItem={({item}) => this._renderItem(item)} // renderItem三个参数item,index,seperator
        keyExtractor={(item) => item.item.id.toString()} // keyExtractor 返回值为字符串类型
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              this.loadData()
            }}
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
    )
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

  loadData() {
    const KEY = this.storeName
    const url = `${URL}${KEY}`
    const {onFreshData} = this.props
    onFreshData(url, KEY, pageSize)
  }

  loadMore() {
    const {onLoadMoreData} = this.props
    const data = this._store().items
    let pageIndex = this._store().pageIndex
    onLoadMoreData(data, this.storeName, ++pageIndex, pageSize)
  }

  _store() {
    const {popular} = this.props
    const store = popular[this.storeName]
    if(!store) {
      return {
        items: [],
        projectModels: [],
        isLoading: false,
        hideLoadingMore: true,
        pageIndex: 1
      }
    }
    return store
  }

  _renderItem(item) {
    return (
      <PopularItem 
        projectModel={item}
        onSelect={() => {
          NavigatorUtils.goPage({
            projectModel: item.item
          }, 'Detail')
        }}
        onFavorite={(item, isFavorite) => {FavoriteUtil.onFavorite(item, isFavorite, FLAG_STORAGE.flag_popular)}}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  popular: state.popular
})

const mapDispatchToProps = (dispatch) => ({
  onFreshData(url, storeName, pageSize) {
    dispatch(popularActions.onRefreshPopular(url, storeName, pageSize))
  },
  onLoadMoreData(data, storeName, pageIndex, pageSize) {
    dispatch(popularActions.onLoadMorePopular(data, storeName, pageIndex, pageSize))
  }
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab) // 将store映射到PopularTab的props

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
  tabStyle: {
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13
  },
  item_container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5
  },
  indicator_container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

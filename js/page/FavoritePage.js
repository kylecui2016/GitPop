/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import BaseItem from '../common/BaseItem';
import NavigationBar from '../common/NavigationBar'
import PopularItem from '../common/PopularItem'
import TrendingItem from '../common/TrendingItem'
import {FLAG_STORAGE} from '../expand/dao/DataStore'
import {favoriteActions} from '../action'
import FavoriteUtil from '../utils/FavoriteUtil'

type Props = {};
export default class FavoritePage extends Component<Props> {
  constructor(props) {
    super(props)
  }

  _tabs() {
    return {
      'Popular': {
        screen: (props) => (<FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular} />),
        navigationOptions: {
          title: '最热'
        }
      },
      'Trending': {
        screen: (props) => (<FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending} />),
        navigationOptions: {
          title: '趋势'
        }
      }
    }
  }

  render() {
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator(this._tabs(),{
      tabBarOptions: {
        upperCaseLabel: false,
        scrollEnabled: false,
        style: {
          backgroundColor: '#678'
        },
        labelStyle: {
          fontSize: 14
        },
        indicatorStyle: {
          backgroundColor: 'white'
        },
        tabStyle: {
          
        }
      }
    }))
    return (
      <View style={styles.container}>
        <NavigationBar 
          title={'收藏'}
        />
        <TabNavigator />
      </View>
    );
  }
}

class FavoriteTab extends Component {
  constructor(props) {
    super(props)
    this.storeName = this.props.flag
  }

  _store() {
    const {favorite} = this.props
    const store = favorite[this.storeName]
    if(!store) {
      return {
        projectModels: [],
        isLoading: false
      }
    }
    return store
  }

  render() {
    const {projectModels, isLoading} = this._store()
    const {flag} = this.props
    return (
      <View style={{flex: 1}}>
        <FlatList 
          data={projectModels}
          renderItem={({item}) => this.renderItem(item, flag)} // this.renderItem(item, flag)外面不要加大括号
          keyExtractor={(item) => '' + (item.item.id || item.item.fullName)}
          refreshControl={
            <RefreshControl 
              onRefresh={() => {this.loadData()}}
              refreshing={isLoading}
            />
          }
        />
      </View>
    )
  }

  renderItem(item, flag) {
    const Item = flag === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem
    return (
      <Item 
        projectModel={item}
        onSelect={() => {
          NavigatorUtils.goPage({
            projectModel: item.item
          }, 'Detail')
        }}
        onFavorite={(item, isFavorite) => {FavoriteUtil.onFavorite(item, isFavorite, flag)}}
      />
    )
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const {flag, onLoadFavoriteData} = this.props
    onLoadFavoriteData(flag)
  }
}

const mapStateToProps = (state) => ({
  favorite: state.favorite
})

const mapDispatchToProps = (dispatch) => ({
  onLoadFavoriteData(flag) {
    dispatch(favoriteActions.onLoadFavorite(flag))
  }
})

const FavoriteTabPage = connect(mapStateToProps, mapDispatchToProps)(FavoriteTab)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

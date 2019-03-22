import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native'
import NavigationBar from '../../../common/NavigationBar'
import ViewUtil from '../../../utils/ViewUtil'
import NavigatorUtils from '../../../navigator/NavigatorUtils'
import {connect} from 'react-redux'

class MyFavoritePage extends Component {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
    }

    NavigationBar() {
        const title = this.params.title
        return (
            <NavigationBar
                style={{backgroundColor: '#F1EBDD'}}
                leftButton={ViewUtil.getLeftButton(() => this.Backwards())}
                title={title}
                // titleLayoutStyle={{fontSize: 16, color: '#666'}}
            />
        )
    }

    Backwards() {
        NavigatorUtils.goBack(this.props)
    }

    render () {
        return (
            <View>
                {this.NavigationBar()}
                <FlatList 
                    data={this.myFavoriteData}
                    renderItem={(item) => {this._renderItem(item)}}
                    keyExtractor={(item) => item.title }
                />
            </View>
        )
    }

    _renderItem(item) {
        return (
            <View>
                <Text>{item.type}</Text>
                <Text>{item.title}</Text>
            </View>
        )
    }

    onLoad() {
        const {onLoadMyFavoriteData} = this.props
        onLoadMyFavoriteData(url)
    }

    componentDidMount() {
        
    }
}

const mapStateToProps = (state) => ({
    myFavoriteData: state.myFavoriteData
})

const mapDispatchToProps = (dispatch) => ({
    onLoadMyFavoriteData() {
        dispatch()
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyFavoritePage)
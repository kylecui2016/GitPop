import React, {Component} from 'react'
import {StyleSheet, ViewPropTypes, View, StatusBar, Text, Platform} from 'react-native'
import {PropTypes} from 'prop-types'

const STATUS_BAR_HEIGHT = 20
const NAV_BAR_HEIGHT_IOS = 44
const NAV_BAR_HEIGHT_ANDROID = 50

export default class NavigationBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {style, titleLayoutStyle} = this.props
        let StatusBarEle = this.props.StatusBar.hidden ? null : 
        (<View>
            <StatusBar style={styles.StatusBar} {...this.props.StatusBar}/>
        </View>)

        let titleView = this.props.titleView ? this.props.titleView :
        (<Text ellipsizeMode="head" numberOfLines={1} style={[styles.title, titleLayoutStyle]}>
            {this.props.title}
        </Text>)

        let content = this.props.hide ? null :
        (<View style={styles.navBar}>
            {this._getButtonElement(this.props.leftButton)}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {this._getButtonElement(this.props.rightButton)}
        </View>)

        return (
            <View style={[styles.container, style]}>
                {StatusBarEle}
                {content}
            </View>
        )
    }

    _getButtonElement(data) {
        return (
            <View style={styles.navButton}>
                {data ? data : null}
            </View>
        )
    }
}

const StatusBarShape = {
    barStyle: PropTypes.string,
    backgroundColor: PropTypes.string,
    hidden: PropTypes.bool
}

NavigationBar.propTypes = {
    style: ViewPropTypes.style,
    leftButton: PropTypes.element,
    title: PropTypes.string,
    titleView: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    StatusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    hide: PropTypes.bool
}

NavigationBar.defaultProps = {
    hide: false,
    StatusBar: {
        barStyle: 'light-content',
        hidden: false
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#678'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID
    },
    titleViewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 80,
        right: 80,
        top: 0,
        bottom: 0
    },
    title: {
        fontSize: 14,
        color: 'white',
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    StatusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0
    }
})
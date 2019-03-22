import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createAppContainer ,
    createSwitchNavigator
} from 'react-navigation'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'
import MyFavoritesPage from '../page/UserCenter/UserInfo/Favorite'
import MyCommentsPage from '../page/UserCenter/UserInfo/Comment'
import MyPushPage from '../page/UserCenter/UserInfo/Push'
import CheckMessagePage from '../page/UserCenter/UserInfo/Message'
import HelpPage from '../page/UserCenter/UserInfo/Help'
import FeedbackPage from '../page/UserCenter/UserInfo/Feedback'
import SettingsPage from '../page/UserCenter/UserInfo/Settings'
import FetchDemoPage from '../page/FetchDemoPage'
import AsyncStoragePage from '../page/AsyncStoragePage'
import DataStoreDemoPage from '../page/DataStoreDemoPage'
import { connect } from 'react-redux'
import { 
    createReactNavigationReduxMiddleware, 
    createReduxContainer,
    createNavigationReducer
} from 'react-navigation-redux-helpers'

export const rootCom = 'Init'; // 设置根路由

const InitNavigator = createStackNavigator({
    Welcome: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    }
})

const MainNavigator = createStackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    Detail: {
        screen: DetailPage,
        navigationOptions: {
            header: null
        }
    },
    MyFavorites: {
        screen: MyFavoritesPage,
        navigationOptions: {
            header: null
        }
    },
    MyComments: {
        screen: MyCommentsPage,
        navigationOptions: {
            header: null
        }
    },
    MyPush: {
        screen: MyPushPage,
        navigationOptions: {
            header: null
        }
    },
    CheckMessage: {
        screen: CheckMessagePage,
        navigationOptions: {
            header: null
        }
    },
    Help: {
        screen: HelpPage,
        navigationOptions: {
            header: null
        }
    },
    Feedback: {
        screen: FeedbackPage,
        navigationOptions: {
            header: null
        }
    },
    Settings: {
        screen: SettingsPage,
        navigationOptions: {
            header: null
        }
    },
    FetchDemo: {
        screen: FetchDemoPage,
        navigationOptions: {
            // header: null
        }
    },
    AsyncStorage: {
        screen: AsyncStoragePage,
        navigationOptions: {
            // header: null
        }
    },
    DataStoreDemo: {
        screen: DataStoreDemoPage,
        navigationOptions: {
            // header: null
        }
    }
})

export const RootNavigator = createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator
}, {
    defaultNavigationOptions: {
        header: null
    }
}))

/**
 * 初始化 react-navigation 与 redux 的中间件,
 * 该方法的一个很大的作用就是为 reduxifyNavigator 的 key 设置 actionSubscribers(行为订阅者)
 * @type Middleware
 */
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav
)

/**
 * 将导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将 navigation state 和 dispatch 函数作为 props 的新组件
 * 注意: 要在 createReactNavigationReduxMiddleware 之后执行
 */
const App = createReduxContainer(RootNavigator)
const mapStateToProps = state => ({
    state: state.nav,
});


/**
 * 连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(App);
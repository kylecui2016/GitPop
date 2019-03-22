import { combineReducers } from 'redux';
import { rootCom, RootNavigator } from '../navigator/AppNavigator';
import { createNavigationReducer } from 'react-navigation-redux-helpers'
import theme from './theme'
import popular from './popular'
import trending from './trending'
import favorite from './favorite'
import userCenter from './userCenter'

// // 1.制定默认 state
// const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

// // 2.创建自己的navigation reducer
// const navReducer = (state = navState, action) => {
//   const nextState = RootNavigator.router.getStateForAction(action, state);
//   // 如果 nextState 为 null或者未定义, 返回原 state
//   return nextState || state;
// }

const navReducer = createNavigationReducer(RootNavigator);

// 3.合并 reducer
const reducers = combineReducers({
  nav: navReducer,
  theme: theme,
  popular: popular,
  trending: trending,
  favorite: favorite,
  userCenter: userCenter
});

export default reducers;
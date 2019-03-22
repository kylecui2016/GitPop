import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

export const MENU = {
    myFavorites: {
        name: '我的收藏',
        Icons: AntDesign,
        icon: 'staro'
    },
    myComments: {
        name: '我的评论',
        Icons: MaterialCommunityIcons,
        icon: 'comment-processing-outline'
    },
    myPush: {
        name: '我的推送',
        Icons: Entypo,
        icon: 'news'
    },
    checkMessage: {
        name: '查看消息',
        Icons: AntDesign,
        icon: 'clockcircleo'
    },
    help: {
        name: '使用帮助',
        Icons: MaterialCommunityIcons,
        icon: 'help-circle-outline'
    },
    feedback: {
        name: '意见反馈',
        Icons: SimpleLineIcons,
        icon: 'note'
    },
    setting: {
        name: '系统设置',
        Icons: AntDesign,
        icon: 'setting'
    }
}
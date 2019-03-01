export default class NavigatorUtils {
    static goPage(params, page) {
        const navigation = NavigatorUtils.navigation
        if(!navigation) {
            console.log('navigation can not be null')
            return
        }
        navigation.navigate(page, {...params})
    }
    static goBack(params) {
        const { navigation } = params
        navigation.goback()
    }
    static resetToHome(params) {
        const { navigation } = params
        navigation.navigate('Main')
    }
} 
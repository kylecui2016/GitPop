import FavoriteDao from '../expand/dao/FavoriteDao'
import {FLAG_STORAGE} from '../expand/dao/DataStore'

export default class FavoriteUtil {
    static onFavorite(item, isFavorite, flag) {
        let favoriteDao = new FavoriteDao(flag)
        let key = flag === FLAG_STORAGE.flag_trending ? item.fullName : item.id.toString()
        if(isFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item))
        }else {
            favoriteDao.removeFavoriteItem(key)
        }
    }

    static checkFavorite(item, keys) {
        if(!keys || keys.length === 0) return false
        let key = item.id ? item.id.toString() : item.fullName
        for(let i = 0, len = keys.length; i < len;i ++ ) {
            if(key === keys[i]) return true
        }
        return false
    }
}
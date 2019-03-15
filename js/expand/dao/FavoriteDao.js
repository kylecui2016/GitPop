import {AsyncStorage} from 'react-native'

const FAVORITE_FLAG_PREFIX = 'favorite_'

export default class FavoriteDao {
    constructor(flag) {
        this.favoriteKey = `${FAVORITE_FLAG_PREFIX}${flag}`
    }

    saveFavoriteItem(key, value) {
        AsyncStorage.setItem(key, value, (error, result) => {
            if(!error) {
                this.updateFavoriteKeys(key, true)
            }
        })
    }

    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error, result) => {
            if(!error) {
                this.updateFavoriteKeys(key, false)
            }
        })
    }   

    updateFavoriteKeys(key, isAdd) {
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if(!error) {
                let favoriteKeys = []
                if(result) {
                    favoriteKeys = JSON.parse(result)
                }
                let index = favoriteKeys.indexOf(key)
                if(isAdd) {
                    index === -1 ? favoriteKeys.push(key) : ''
                }else {
                    index === -1 ? '' : favoriteKeys.splice(index, 1)
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
            }
        })
    }

    getFavoriteKeys() {
        return new Promise ((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if(!error) {
                    try {
                        resolve(JSON.parse(result))
                    }catch {
                        reject(result)
                    }
                }else {
                    reject(result)
                }
            })
        })
    }

    getAllItems() {
        return new Promise((resolve, reject) => {
            this.getFavoriteKeys().then((keys) => {
                let items = []
                if(keys) {
                    try {
                        AsyncStorage.multiGet(keys, (error, stores) => {
                            stores.map((item, index, store) => {
                                let value = store[index][1]
                                value && items.push(JSON.parse(value))
                            })
                            resolve(items)
                        })
                    }catch(e) {
                        reject(e)
                    }
                }else {
                    resolve(items)
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }
}
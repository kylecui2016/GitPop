import { AsyncStorage } from 'react-native'
import GitHubTrending from 'GitHubTrending'

export const FLAG_STORAGE = {
    flag_popular: 'popular',
    flag_trending: 'trending'
}

export default class DataStore {

    saveData(url, data, callback) {
        if(!url || !data) return
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
    }

    _wrapData(data) {
        return {timestamp: new Date().getTime(), data: data}
    }

    fetchData(url, flag) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((wrappedData) => {
                if(wrappedData && DataStore.checkTimestampValid(wrappedData.timestamp)) { // 不能用this.checkTimestampValid
                    resolve(wrappedData)
                }else{
                    this.fetchNetData(url, flag).then((data) => {
                        resolve(this._wrapData(data))
                    }).catch((e) => {
                        reject(e)
                    })
                }
            }).catch((e) => {
                this.fetchNetData(url, flag).then((data) => {
                    resolve(this._wrapData(data))
                }).catch((e) => {
                    reject(e)
                })
            })
        })
    }

    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, data) => {
                if(!error) {
                    resolve(JSON.parse(data))
                }else {
                    reject(error)
                }
            })
        })
    }

    fetchNetData(url, flag) {
        return new Promise ((resolve, reject) => {
            if(flag === FLAG_STORAGE.flag_popular) {
                fetch(url)
                .then((response) => {
                    if(response.ok) {
                        return response.json()
                    }
                    reject(response)
                    // throw new Error('Network error')
                })
                .then((responseData) => {
                    this.saveData(url, responseData)
                    resolve(responseData)
                })
                .catch((e) => {
                    reject(e)
                    console.error(e)
                })
            }else if(flag === FLAG_STORAGE.flag_trending) {
                new GitHubTrending().fetchTrending(url)
                    .then((data) => {
                        this.saveData(url, data)
                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            }
        })
    }

    static checkTimestampValid(timestamp) {
        const nowDate = new Date()
        const targetDate = new Date(timestamp)
        if(nowDate.getFullYear() !== targetDate.getFullYear()) return false
        if(nowDate.getMonth() !== targetDate.getMonth()) return false
        if(nowDate.getDay() !== targetDate.getDay()) return false
        if(nowDate.getHours() - targetDate.getHours() > 24) return false
        return true
    }
}
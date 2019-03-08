import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore'
import * as constants from '../constants'

const trendingRefresh = (storeName) => ({
    type: constants.TRENDING_REFRESH,
    storeName
})

const trendingRefreshSuccess = (data, projectModels, storeName) => ({
    type: constants.TRENDING_REFRESH_SUCCESS,
    data,
    projectModels,
    storeName
})

const trendingRefreshFail = (error, storeName) => ({
    type: constants.TRENDING_REFRESH_FAIL,
    error,
    storeName
})

const trendingLoadMoreSuccess = (projectModels, storeName, pageIndex) => ({
    type: constants.TRENDING_LOADMORE_SUCCESS,
    projectModels,
    storeName,
    pageIndex
})

const trendingLoadMoreFail = (projectModels, storeName, pageIndex) => ({
    type: constants.TRENDING_LOADMORE_FAIL,
    projectModels,
    storeName,
    pageIndex
})

const handleData = (data, pageIndex, pageSize) => {
    return Array.isArray(data)&&data.slice(0, pageSize * pageIndex)
}

export const onRefreshTrending = (url, storeName, pageSize) => {
    return (dispatch) => {
        const data_store = new DataStore()
        dispatch(trendingRefresh(storeName))
        data_store.fetchData(url, FLAG_STORAGE.flag_trending).then((data) => {
            const items = data.data
            const projectModels = handleData(items, 1, pageSize)
            dispatch(trendingRefreshSuccess(items, projectModels, storeName))
        }).catch((error) => {
            dispatch(trendingRefreshFail(storeName))
            console.error(error)
        })
    }
}

export const onLoadMoreTrending = (data, storeName, pageIndex, pageSize) => {
    return (dispatch) => {
        setTimeout(() => {
            if(pageSize * pageIndex > data.length) {
                dispatch(trendingLoadMoreFail(data, storeName, pageIndex))
                return 
            }
            const _data = handleData(data, pageIndex, pageSize)
            dispatch(trendingLoadMoreSuccess(_data, storeName, pageIndex, pageSize))
        },500)
    }
}
import DataStore from '../../expand/dao/DataStore'
import * as constants from '../../action/constants'

const popularRefresh = (storeName) => ({
    type: constants.POPULAR_REFRESH,
    storeName
}) 

const popularRefreshSuccess = (data, projectModels, storeName) => ({
    type: constants.POPULAR_REFRESH_SUCCESS,
    data,
    projectModels,
    storeName
}) 

const popularRefreshFail = (storeName) => ({
    type: constants.POPULAR_REFRESH_FAIL,
    storeName
})

const popularLoadMoreSuccess = (projectModels, storeName, pageIndex) => ({
    type: constants.POPULAR_LOADMORE_SUCCESS,
    projectModels,
    storeName,
    pageIndex
})

const popularLoadMoreFail = (projectModels, storeName, pageIndex) => ({
    type: constants.POPULAR_LOADMORE_FAIL,
    projectModels,
    storeName,
    pageIndex
})

const handleData = (data, pageIndex, pageSize) => {
    return Array.isArray(data)&&data.slice(0, pageSize * pageIndex)
}

export const onRefreshPopular = (url, storeName, pageSize) => {
    return (dispatch) => {
        const data_store = new DataStore()
        dispatch(popularRefresh(storeName))
        data_store.fetchData(url).then((data) => {
            const items = data.data.items
            const projectModels = handleData(items, 1, pageSize)
            dispatch(popularRefreshSuccess(items, projectModels, storeName))
        }).catch((error) => {
            dispatch(popularRefreshFail(storeName))
            console.error(error)
        })
    }
}

export const onLoadMorePopular = (data, storeName, pageIndex, pageSize) => {
    return (dispatch) => {
        if(pageSize * pageIndex > data.length) {
            dispatch(popularLoadMoreFail(data, storeName, pageIndex))
            return 
        }
        const _data = handleData(data, pageIndex, pageSize)
        dispatch(popularLoadMoreSuccess(_data, storeName, pageIndex, pageSize))
    }
}
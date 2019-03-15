import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore'
import * as constants from '../../action/constants'
import ProjectModel from '../../model/ProjectModel'
import FavoriteDao from '../../expand/dao/FavoriteDao'
import FavoriteUtil from '../../utils/FavoriteUtil'

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

const handleData = (dispatch, data, pageIndex, pageSize, storeName, flag, actionType) => {
    const items = Array.isArray(data)&&data.slice(0, pageSize * pageIndex)
    _projectModels(items, flag, (projectModels) => {
        dispatch({
            type: actionType,
            data,
            projectModels,
            storeName,
            pageIndex
        })
    })
}

const _projectModels = async (items, flag, callback) => {
    let projectModels = []
    let keys = []
    let favoriteDao = new FavoriteDao(flag)
    try{
        keys = await favoriteDao.getFavoriteKeys()
    }catch(e) {
        console.log(e)
    }
    items.map((item, index) => {
        projectModels.push(new ProjectModel(item, FavoriteUtil.checkFavorite(item, keys)))
    })
    // return projectModels
    doCallBack(callback, projectModels)
}

const doCallBack = (callback, object) => {
    if(typeof callback === 'function'){
        callback(object)
    }
}

export const onRefreshPopular = (url, storeName, pageSize) => {
    return (dispatch) => {
        const data_store = new DataStore()
        dispatch(popularRefresh(storeName))
        data_store.fetchData(url, FLAG_STORAGE.flag_popular).then((data) => {
            const items = data.data.items
            // const projectModels = handleData(items, 1, pageSize)
            // dispatch(popularRefreshSuccess(items, projectModels, storeName))
            handleData(dispatch, items, 1, pageSize, storeName, FLAG_STORAGE.flag_popular, constants.POPULAR_REFRESH_SUCCESS)
        }).catch((error) => {
            dispatch(popularRefreshFail(storeName))
            console.error(error)
        })
    }
}

export const onLoadMorePopular = (data, storeName, pageIndex, pageSize) => {
    return (dispatch) => {
        setTimeout(() => {
            if(pageSize * pageIndex > data.length) {
                // dispatch(popularLoadMoreFail(data, storeName, pageIndex))
                handleData(dispatch, data, pageIndex, pageSize, storeName, FLAG_STORAGE.flag_popular, constants.POPULAR_LOADMORE_FAIL)
                return 
            }
            // const _data = handleData(data, pageIndex, pageSize)
            // dispatch(popularLoadMoreSuccess(_data, storeName, pageIndex, pageSize))
            handleData(dispatch, data, pageIndex, pageSize, storeName, FLAG_STORAGE.flag_popular, constants.POPULAR_LOADMORE_SUCCESS)
        },500)
    }
}
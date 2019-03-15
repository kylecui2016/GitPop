import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore'
import * as constants from '../constants'
import ProjectModel from '../../model/ProjectModel';
import FavoriteUtil from '../../utils/FavoriteUtil'
import FavoriteDao from '../../expand/dao/FavoriteDao';

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

export const onRefreshTrending = (url, storeName, pageSize) => {
    return (dispatch) => {
        const data_store = new DataStore()
        dispatch(trendingRefresh(storeName))
        data_store.fetchData(url, FLAG_STORAGE.flag_trending).then((data) => {
            const items = data.data
            handleData(dispatch, items, 1, pageSize, storeName, FLAG_STORAGE.flag_trending, constants.TRENDING_REFRESH_SUCCESS)
            // dispatch(trendingRefreshSuccess(items, projectModels, storeName))
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
                // dispatch(trendingLoadMoreFail(data, storeName, pageIndex))
                handleData(dispatch, data, pageIndex, pageSize, storeName, FLAG_STORAGE.flag_trending, constants.TRENDING_LOADMORE_FAIL)
                return 
            }
            // const _data = handleData(data, pageIndex, pageSize)
            // dispatch(trendingLoadMoreSuccess(_data, storeName, pageIndex, pageSize))
            handleData(dispatch, data, pageIndex, pageSize, storeName, FLAG_STORAGE.flag_trending, constants.TRENDING_LOADMORE_SUCCESS)
        },500)
    }
}
import * as constants from '../../action/constants'

const defaultState = {}

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.POPULAR_REFRESH: 
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                    hideLoadingMore: true
                }
            }
        case constants.POPULAR_REFRESH_SUCCESS: 
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.data,
                    projectModels: action.projectModels,
                    pageIndex: 1,
                    isLoading: false,
                    hideLoadingMore: true
                }
            }
        case constants.POPULAR_REFRESH_FAIL: 
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            }
        case constants.POPULAR_LOADMORE_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        case constants.POPULAR_LOADMORE_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex
                }
            }
        default: 
            return state
    }
}
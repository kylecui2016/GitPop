import * as constants from '../../action/constants'

const defaultState = {}

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.TRENDING_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true
                }
            }
        case constants.TRENDING_REFRESH_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    data: action.data,
                    projectModels: action.projectModels,
                    pageIndex: 1,
                    isLoading: false,
                    hideLoadingMore: false
                }
            }
        case constants.TRENDING_REFRESH_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                    error: action.error
                }
            }
        case constants.TRENDING_LOADMORE_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        case constants.TRENDING_LOADMORE_FAIL:
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
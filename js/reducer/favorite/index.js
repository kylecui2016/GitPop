import * as constants from '../../action/constants'

const defaultState = {}

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.FAVORITE_LOAD:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true
                }
            }
        case constants.FAVORITE_LOAD_SUCCESS: 
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    isLoading: false
                }
            }
        case constants.FAVORITE_LOAD_FAIL: 
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            }
        default: 
            return state
    }
}
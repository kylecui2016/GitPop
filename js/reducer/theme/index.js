import * as constants from '../../action/constants'

const defaultState = {
    theme: 'green'
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme
            }
        default:
            return state
    }
}
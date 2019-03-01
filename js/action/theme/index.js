import * as constants from '../constants'

export const changeTheme = (theme) => ({
    type: constants.THEME_CHANGE,
    theme
})
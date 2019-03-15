import FavoriteDao from '../../expand/dao/FavoriteDao'
import * as constants from '../constants'
import ProjectModel from '../../model/ProjectModel'

export const onLoadFavorite = (flag) => {
    const favoriteDao = new FavoriteDao(flag)
    return (dispath) => {
        const resultData = []
        dispath({
            type: constants.FAVORITE_LOAD,
            storeName: flag
        })
        favoriteDao.getAllItems().then((res) => {
            res.map((item, index) => {
                resultData.push(new ProjectModel(item, true))
            })
            dispath({
                type: constants.FAVORITE_LOAD_SUCCESS,
                projectModels: resultData,
                storeName: flag
            })
        }).catch((e) => {
            console.log(e)
            dispath({
                type: constants.FAVORITE_LOAD_FAIL,
                storeName: flag
            })
        })
    }
}
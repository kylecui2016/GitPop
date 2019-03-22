export const loadMyFavoriteAction = () => {
    return (dispatch) => {
        fetch('http://192.168.74.77:8080/favorite.json').then((res) => {
            if(res.ok) {
                return res.json()
            }
        }).then((res) => {
            const _data = res.data.favorite
            dispatch({
                
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}
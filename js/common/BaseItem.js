import React, {Component} from 'react'
import {TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class BaseItem extends Component {
    constructor(props) {
        super(props)
        this.state={
            isFavorite: this.props.projectModel.isFavorite
        }
    }

    setFavoriteState(isFavorite) {
        this.props.projectModel.isFavorite = isFavorite
        this.setState({
            isFavorite
        })
    }

    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite)
        this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite)
    }

    renderFavoriteIcon() {
        return (
            <TouchableOpacity 
                style={{marginRight: 20}}
                onPress={() => {this.onPressFavorite()}}
            >
                <FontAwesome
                    name={this.state.isFavorite ? 'star' : 'star-o'}
                    size={26}
                    color={'gray'}
                />
            </TouchableOpacity>
        )
    }
}
import React from 'react'
import axios from 'axios'
import { getSearchPath, shouldUpdateSearch } from '../../Resolvers/SearchResolver/SearchResolver'
import { searchMode } from '../../enums'

interface Props {
    city: string,
    coord: [string, string],
    searchMethod: searchMode
}

export interface CurrentState {

}

class Current extends React.Component<Props> {

    componentDidUpdate(prevProps: Props) {
        if (shouldUpdateSearch(this.props.city, this.props.coord, prevProps.city, prevProps.coord, this.props.searchMethod)) {
            this.getCurrent()
        }
    }

    getCurrent = () => {
        const url = "https://forecast-io-server.herokuapp.com/current" + getSearchPath(this.props.searchMethod, this.props.city, this.props.coord)
        axios.get(url).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
            this.setState({ code: err.cod, message: err.message })
            //this.props.updateLoading(false)
        })
    }

    render () {

        return (<h1>Current</h1>)
    }
}

export default Current
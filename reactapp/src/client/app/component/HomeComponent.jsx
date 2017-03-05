import React from 'react'
import { connect } from 'react-redux'
import { FETCH_ACCOUNT, RESET_SHEET, RESET_OPERATION } from '../constants'

import { Link, browserHistory } from 'react-router'
import { Tooltip } from 'react-mdl'
import {
    changeCurrentAccount,
    changeCurrentSheet,
    changeCurrentOperation
} from '../actions'
import axios from 'axios'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likesCount : 0,
            accounts: [
                {id: 1, name: 'Compte perso', updated_at: 25, created_at: 250}
            ]
        };
    }
    componentDidMount() {
        var _self = this;
        axios.get(`/api/accounts`).then((response) => {
            _self.setState({ accounts: response.data });
        });
    }
    componentWillUnmount() {

    }
    navigateAccount(id){
        this.props.dispatch((dispatch) => {
            var prom = axios.get(`/api/account/${id}`);
            prom.then((response) => {
                if(response.data.id)
                    browserHistory.push(`/account/${id}`)
            })
            dispatch({
                type: FETCH_ACCOUNT,
                payload: prom
            })
        })

        this.props.dispatch({
            type: RESET_SHEET,
        })

        this.props.dispatch({
            type: RESET_OPERATION,
        })
    }
    render () {
        return (
            <div>
            <h5>Comptes</h5>
               <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                   <thead>
                       <tr>
                           <th className="mdl-data-table__cell--non-numeric">Nom</th>
                           <th>Fiches</th>
                           <th>Opérations</th>
                           <th>Date de création</th>
                           <th>Date de modification</th>
                           <th></th>
                       </tr>
                   </thead>
                   <tbody>
                       {this.state.accounts.map(o => {
                            return (
                                <tr key={o.id}>
                                    <td className="mdl-data-table__cell--non-numeric">{ o.name }</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>{ o.created_at }</td>
                                    <td>{ o.updated_at }</td>
                                    <td>
                                        <a onClick={ this.navigateAccount.bind(this, o.id) }>
                                            <Tooltip label={<span><strong>Ouvrir</strong></span>} position="left">
                                                <i className="material-icons">open_in_new</i>
                                            </Tooltip>
                                        </a>
                                    </td>
                                </tr>
                            )
                       })}
                   </tbody>
               </table>
            </div>
        );
    }
}

export default connect()(Home);

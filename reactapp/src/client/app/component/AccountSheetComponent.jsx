import React from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { render } from 'react-dom';
import { FETCH_OPERATION, RESET_OPERATION } from '../constants'
import { FABButton, Icon, Tooltip, Chip, ChipContact } from 'react-mdl'
import {
    changeCurrentOperation,
    changeModalContext,
    changeModalVisibility
} from '../actions'
import axios from 'axios'

class AccountSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operations: [],
            rows: ''
        };
    }
    componentDidMount() {
        var sheet_id = this.props.params.sheet_id || this.props.current_sheet.id || 0;
        if(sheet_id === 0){
            this.props.dispatch(changeModalContext('Oups', 'Vous devez sélectionner une feuille de compte en premier lieu!'));
            this.props.dispatch(changeModalVisibility(true));
            browserHistory.push('/home');
            return;
        }
        var _self = this;
        axios.get(`/api/account/${this.props.current_account.id}/sheet/${sheet_id}/operations`).then((response) => {
            _self.setState({ operations: response.data });
        }).then(() => {
            _self.updateRows();
        })
    }
    navigateOperation(operation_id){
        this.props.dispatch((dispatch) => {
            var prom = axios.get(`/api/account/${this.props.current_account.id}/sheet/${this.props.current_sheet.id}/operation/${operation_id}`);
            prom.then((response) => {
                if(response.data.id)
                    browserHistory.push(`/account/${this.props.current_account.id}/sheet/${this.props.current_sheet.id}/operation/${operation_id}`)
            })
            dispatch({
                type: FETCH_OPERATION,
                payload: prom
            })
        })
        this.props.dispatch({
            type: RESET_OPERATION,
        })
    }
    limitDescChar(val){
        if(!val)
            return '';
        var ret = val.toString().substr(0, 15);
        if(ret.length >= 15)
            ret += '...';
        return ret;
    }
    getIconType(type){
        if(type === 0){
            return (
                <Tooltip label={<span><strong>Débit</strong></span>} position="left">
                    <i className="material-icons debit-small">last_page</i>
                </Tooltip>
            )
        }
        return (
            <Tooltip label={<span><strong>Crédit</strong></span>} position="left">
                <i className="material-icons credit-small">first_page</i>
            </Tooltip>
        )
    }
    handleDeleteClick(operation_id){
        var _self = this;
        axios.delete(`/api/account/${this.props.current_account.id}/sheet/${sheet_id}/operation/${operation_id}`).then(response => {
            if(response.status === 204){
                _self.props.dispatch(changeSnackbarContext('Opération supprimée!'));
                _self.props.dispatch(changeSnackbarVisibility(true));
                var new_arr = _self.state.operations.filter(el => el.id !== operation_id )
                _self.setState({ operations: new_arr })
            }
        }).then(() => _self.updateRows() )
    }
    updateRows(){
        var r = this.state.operations.map(o => {
            return (
                <tr key={o.id}>
                    <td className="mdl-data-table__cell--non-numeric">{ o.label }</td>
                    <td>{ o.montant }</td>
                    <td>{ this.limitDescChar(o.comment) }</td>
                    <td>{ o.created_at }</td>
                    <td>
                        <Chip>
                            <ChipContact className="mdl-color--teal mdl-color-text--white">{o.category.label[0].toUpperCase()}</ChipContact>
                            {o.category.label}
                        </Chip>
                    </td>
                    <td>{ this.getIconType() }</td>
                    {/* Finally using programatic redirection instead of Link due to named route removed in react-router 2.0 (and then, not matching the correct active-tab) */}
                    <td>
                        <a onClick={ this.navigateOperation.bind(this, o.id) } className="actionIcon">
                            <Tooltip label={<span><strong>Ouvrir</strong></span>} position="left">
                                <i className="material-icons">open_in_new</i>
                            </Tooltip>
                        </a>
                        <a onClick={ this.handleDeleteClick.bind(this, o.id) } className="actionIcon">
                            <Tooltip label={<span><strong>Effacer</strong></span>} position="left">
                                <i className="material-icons">delete_sweep</i>
                            </Tooltip>
                        </a>
                    </td>
                </tr>
            )
        })
        this.setState({ rows: r });
    }
    handleNewClick(e){
        browserHistory.push('/operation/new');
    }
    render() {
        return (
           <div>
            <h5>Opérations de la fiche <strong>{this.props.current_sheet.name}</strong></h5>
              <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                  <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">Nom</th>
                        <th>Montant</th>
                        <th>Commentaire</th>
                        <th>Date de création</th>
                        <th>Catégorie</th>
                        <th>Type dopération</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.state.rows }
                    </tbody>
                </table>
                <FABButton onClick={ this.handleNewClick.bind(this) }className="fixedButton" colored ripple>
                    <Icon name="add" />
                </FABButton>
           </div>
        )
    }
}

export default connect((state) => {
    return {
        current_account: state.naviguation.current_account,
        current_sheet: state.naviguation.current_sheet
    }
})(AccountSheet);

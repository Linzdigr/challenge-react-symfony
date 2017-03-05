import React from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { FABButton, Icon, Textfield, Tooltip } from 'react-mdl'
import { FETCH_SHEET, RESET_SHEET, RESET_OPERATION } from '../constants'
import {
    changeCurrentSheet,
    changeCurrentOperation,
    changeModalContext,
    changeModalVisibility,
    changeSnackbarContext,
    changeSnackbarVisibility
} from '../actions'
import axios from 'axios'

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sheets: [
                {id: 1, name: 'Sheets...', updated_at: 25, created_at: 250}
            ],
            newSheetRow: '',
            newTitle: '',
            rows: ''
        };
    }
    componentDidMount() {
        var account_id = this.props.params.account_id || this.props.current_account.id || 0;
        if(account_id === 0){
            this.props.dispatch(changeModalContext('Oups', 'Vous devez sélectionner un compte en premier lieu!'));
            this.props.dispatch(changeModalVisibility(true));
            browserHistory.push('/home');
            return;
        }
        var _self = this;
        axios.get(`/api/account/${account_id}/sheets`).then((response) => {
            _self.setState({ sheets: response.data });
        }).then(() => {
            _self.updateRows();
        })
    }
    componentWillUnmount(id) {

    }
    navigateSheet(sheet_id){
        this.props.dispatch((dispatch) => {
            var prom = axios.get(`/api/account/${this.props.current_account.id}/sheet/${sheet_id}`);
            prom.then((response) => {
                if(response.data.id)
                    browserHistory.push(`/account/${this.props.current_account.id}/sheet/${sheet_id}`)
            })
            dispatch({
                type: FETCH_SHEET,
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
    onTitleChange(e){
        this.setState({ newTitle: e.target.value })
    }
    handleDeleteClick(sheet_id){
        var _self = this;
        axios.delete(`/api/account/${this.props.current_account.id}/sheet/${sheet_id}`).then(response => {
            if(response.status === 204){
                _self.props.dispatch(changeSnackbarContext('Fiche de compte supprimée!'));
                _self.props.dispatch(changeSnackbarVisibility(true));
                debugger;
                var new_arr = _self.state.sheets.filter(el => el.id !== sheet_id )
                _self.setState({ sheets: new_arr })
            }
        }).then(() => _self.updateRows() )
    }
    updateRows(){
        var r = this.state.sheets.map(o => {
            return (
                <tr key={o.id}>
                    <td className="mdl-data-table__cell--non-numeric">{ o.name }</td>
                    <td>{ o.created_at }</td>
                    <td>{ o.updated_at }</td>
                    {/* Finally using programatic redirection instead of Link due to named route removed in react-router 2.0 (and then, not matching the correct active-tab) */}
                    <td>
                        <a onClick={ this.navigateSheet.bind(this, o.id) }>
                            <Tooltip label={<span><strong>Ouvrir</strong></span>} position="left">
                                <i className="material-icons">open_in_new</i>
                            </Tooltip>
                        </a>
                        <a onClick={ this.handleDeleteClick.bind(this, o.id) }>
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
    handleSaveClick(e){
        var _self = this;
        axios.post(`/api/account/${this.props.current_account.id}/sheet`, {
            name: _self.state.newTitle
        }).then(response => {
            if(response.status === 201){
                _self.props.dispatch(changeSnackbarContext('Fiche ajoutée!'));
                _self.props.dispatch(changeSnackbarVisibility(true));
                _self.setState({ newSheetRow: '' });
                _self.setState({ sheets: _self.state.sheets.concat(response.data) });
                console.log('assigned: ', _self.state);
                _self.updateRows();
            }
        }).catch(err => {
            _self.props.dispatch(changeModalContext('Oups', `Une erreur s'est produite`));
            _self.props.dispatch(changeSnackbarVisibility(true));
        });
    }
    handleNewClick(e){
        this.setState({newSheetRow: (
            <tr key="new">
                <td className="mdl-data-table__cell--non-numeric">
                    <Textfield
                        onChange={ this.onTitleChange.bind(this) }
                        label="Libellé..."
                        value={ this.newTitle }
                        style={{width: '100%'}}
                    />
                </td>
                <td>-</td>
                <td>-</td>
                {/* Finally using programatic redirection instead of Link due to named route removed in react-router 2.0 (and then, not matching the correct active-tab) */}
                <td><a onClick={ this.handleSaveClick.bind(this) }>Enregistrer</a></td>
            </tr>
        )})
        window.scrollTo(0, document.body.scrollHeight);
    }
   render() {
        return (
            <div>
                <h5>Feuilles de comptes du compte <strong>{this.props.current_account.name}</strong></h5>
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                        <tr>
                            <th className="mdl-data-table__cell--non-numeric">Nom</th>
                            <th>Date de création</th>
                            <th>Date de modification</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.rows }
                        { this.state.newSheetRow }
                    </tbody>
                </table>
                <FABButton className="fixedButton" colored ripple onClick={ this.handleNewClick.bind(this) }>
                    <Icon name="add" />
                </FABButton>
            </div>
        )
    }
}

export default connect((state) => {
    return { current_account: state.naviguation.current_account, modal: state.modal }
})(Account);

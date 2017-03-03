import React from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { render } from 'react-dom';
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
            operations: []
        };
    }
    componentDidMount() {
        if(this.props.current_account === 0 || this.props.current_sheet === 0){
            this.props.dispatch(changeModalContext('Oups', 'Vous devez sélectionner une feuille de compte en premier lieu!'));
            this.props.dispatch(changeModalVisibility(true));
            browserHistory.push('/home');
            return;
        }
        var _self = this;
        axios.get(`/api/account/${this.props.current_account}/sheet/${this.props.current_sheet}/operations`).then((response) => {
            _self.setState({ operations: response.data });
        })
    }
    navigateOperation(operation_id){
        this.props.dispatch(changeCurrentOperation(operation_id));
        browserHistory.push('/operation');
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
    render() {
        return (
           <div>
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
                        {this.state.operations.map(o => {
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
                                    <td><a onClick={ this.navigateOperation.bind(this, o.id) }>Ouvrir</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <FABButton className="fixedButton" colored ripple>
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

import React from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { FABButton, Icon } from 'react-mdl'
import {
    changeCurrentSheet,
    changeCurrentOperation,
    changeModalContext,
    changeModalVisibility
} from '../actions'
import axios from 'axios'

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sheets: [
                {id: 1, name: 'Compte perso', updated_at: 25, created_at: 250}
            ]
        };
    }
    componentDidMount() {
        if(this.props.current_account === 0){
            this.props.dispatch(changeModalContext('Oups', 'Vous devez sélectionner un compte en premier lieu!'));
            this.props.dispatch(changeModalVisibility(true));
            browserHistory.push('/home');
            return;
        }
        var _self = this;
        axios.get(`/api/account/${this.props.current_account}/sheets`).then((response) => {
            _self.setState({ sheets: response.data });
        })
    }
    componentWillUnmount(id) {

    }
    navigateSheet(sheet_id){
        this.props.dispatch(changeCurrentSheet(sheet_id));
        this.props.dispatch(changeCurrentOperation(0));
        browserHistory.push('/sheet');
    }
   render() {
      return (
         <div>
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                    <tr>
                        <th className="mdl-data-table__cell--non-numeric">Nom</th>
                        <th>Fiches</th>
                        <th>Description</th>
                        <th>Date de création</th>
                        <th>Date de modification</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.sheets.map(o => {
                        return (
                            <tr key={o.id}>
                                <td className="mdl-data-table__cell--non-numeric">{ o.name }</td>
                                <td>-</td>
                                <td>{ o.description }</td>
                                <td>{ o.created_at }</td>
                                <td>{ o.updated_at }</td>
                                {/* Finally using programatic redirection instead of Link due to named route removed in react-router 2.0 (and then, not matching the correct active-tab) */}
                                <td><a onClick={ this.navigateSheet.bind(this, o.id) }>Ouvrir</a></td>
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
    return { current_account: state.naviguation.current_account, modal: state.modal }
})(Account);

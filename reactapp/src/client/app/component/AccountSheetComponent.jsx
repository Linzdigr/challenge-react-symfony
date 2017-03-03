import React from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { render } from 'react-dom';
import { changeCurrentOperation } from '../actions'
import axios from 'axios'

class AccountSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operations: [
                {id: 1, name: 'Compte perso', updated_at: 25, created_at: 250}
            ]
        };
    }
    componentDidMount() {
        if(this.props.current_sheet === 0){
            alert('Vous devez sélectionner un feuille de compte en premier lieu!');    // TODO: use mdl modals
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
                      {this.state.operations.map(o => {
                          return (
                              <tr key={o.id}>
                                  <td className="mdl-data-table__cell--non-numeric">{ o.name }</td>
                                  <td>-</td>
                                  <td>{ o.description }</td>
                                  <td>{ o.created_at }</td>
                                  <td>{ o.updated_at }</td>
                                  {/* Finally using programatic redirection instead of Link due to named route removed in react-router 2.0 (and then, not matching the correct active-tab) */}
                                  <td><a onClick={ this.navigateOperation.bind(this, o.id) }>Ouvrir</a></td>
                              </tr>
                          )
                      })}
                  </tbody>
              </table>
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

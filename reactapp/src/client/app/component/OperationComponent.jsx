import React from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { render } from 'react-dom';
import axios from 'axios'
import { Textfield, Chip, ChipContact, Switch } from 'react-mdl'

class Operation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: {
                id: 1,
                name: 'Compte perso',
                updated_at: 25,
                created_at: 250
            }
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
        browserHistory.push('/operation');
    }
    render() {
        return (
            <div>
                <Textfield
                    onChange={() => {}}
                    label="Libellé..."
                    floatingLabel
                    style={{width: '200px'}}
                />
                <Textfield
                    onChange={() => {}}
                    label="Montant (€)"
                    floatingLabel
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    error="Input is not a number!"
                    style={{width: '200px'}}
                />
                <Textfield
                    onChange={() => {}}
                    label="Description..."
                    rows={3}
                    style={{width: '200px'}}
                />
                <Chip>
                    <ChipContact className="mdl-color--teal mdl-color-text--white">A</ChipContact>
                    Restauration
                </Chip>
                <Switch ripple id="switch1" defaultChecked>Réglé</Switch>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        current_account: state.naviguation.current_account,
        current_sheet: state.naviguation.current_sheet,
        current_operation: state.naviguation.current_operation
    }
})(Operation);

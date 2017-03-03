import React from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { render } from 'react-dom';
import axios from 'axios'
import { changeModalContext, changeModalVisibility } from '../actions'
import { Textfield, Switch, Grid, Cell, Button, RadioGroup, Radio } from 'react-mdl'

class Operation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation:{
                category: {
                    id : 0,
                    label: '',
                    description: ''
                },
                comment: "",
                created_at: "",
                id: 0,
                label: "",
                montant: 0,
                type: 0,
                updated_at: ""
            },
            categories: []
        };
        this.newCatSelected = this.newCatSelected.bind(this);
        this.changeType = this.changeType.bind(this);
    }
    componentDidMount() {
        if(this.props.current_account === 0 || this.props.current_sheet === 0 || this.props.current_operation === 0 ){
            this.props.dispatch(changeModalContext('Oups', 'Vous devez sélectionner une opération en premier lieu!'));
            this.props.dispatch(changeModalVisibility(true));
            browserHistory.push('/home');
            return;
        }
        var _self = this;
        axios.get(`/api/account/${this.props.current_account}/sheet/${this.props.current_sheet}/operation/${this.props.current_operation}`).then((response) => {
            _self.setState({ operation: response.data })
        })
        axios.get('/api/categories').then((response) => {
            _self.setState({ categories: response.data })
        })
        console.log('componentDidMount: ', this.state);
    }
    navigateOperation(operation_id){
        browserHistory.push('/operation');
    }
    newCatSelected(e){
        const operation = this.state.operation;
        operation.category = this.state.categories.find((el) => { return el.id == e.target.value } );

        this.setState({
            operation
        });
    }
    changeType(e){
        const operation = this.state.operation;
        operation.type = e.target.value;

        this.setState({
            operation
        });
    }
    render() {
        return (
            <div>
                <Grid>
                    <Cell col={6}>
                        <Textfield
                            onChange={() => {}}
                            label="Libellé..."
                            value={this.state.operation.label}
                            floatingLabel
                            style={{width: '100%'}}
                        />
                        <Textfield
                            onChange={() => {}}
                            label="Montant (€)"
                            value={this.state.operation.montant}
                            floatingLabel
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            style={{width: '150px'}}
                        />
                        <Textfield
                            onChange={() => {}}
                            label="Commentaire..."
                            value={this.state.operation.description}
                            rows={3}
                            style={{width: '100%'}}
                        />
                    </Cell>
                    <Cell col={6}>
                        <RadioGroup name="category" value={this.state.operation.category.id} onChange={ (data) => this.newCatSelected(data) }>
                            {this.state.categories.map((o, i) => {
                                return <Radio key={o.id} value={o.id} ripple>{o.label}</Radio>
                            })}
                        </RadioGroup>
                        <RadioGroup name="opType" value={this.state.operation.type} onChange={ (data) => this.changeType(data) }>
                            <Radio value="0" ripple>Débit</Radio>
                            <Radio value="1" ripple>Crédit</Radio>
                        </RadioGroup>
                        <Switch ripple id="switch1" defaultChecked>Réglé</Switch>
                    </Cell>
                    <Cell col={12}>
                        <Button raised ripple colored>Enregistrer</Button>
                    </Cell>
                </Grid>
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

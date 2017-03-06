import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import axios from 'axios'
import { FETCH_OPERATION, RESET_OPERATION } from '../constants'
import {
    changeModalContext,
    changeModalVisibility,
    changeSnackbarContext,
    changeSnackbarVisibility,
    changeOperationCategory,
    changeOperationComment,
    changeOperationTitle,
    changeOperationType,
    changeOperationAmount
} from '../actions'
import { Textfield, Switch, Grid, Cell, Button, RadioGroup, Radio } from 'react-mdl'

class Operation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    componentDidMount() {
        var _self = this;
        var operation_id = this.props.params.operation_id || this.props.current_operation.id || 0;
        if(operation_id === 0 && this.props.current_sheet.id === 0){    // Pas de fiche encore consultée ni de demande d'opération
            this.props.dispatch(changeModalContext('Oups', 'Vous devez sélectionner une opération en premier lieu!'));
            this.props.dispatch(changeModalVisibility(true));
            browserHistory.push('/home');
            return;
        }
        else if(operation_id !== 0 && this.props.route.path !== 'operation/new'){ // opération déjà consultée mais pas de demande de créa
            this.props.dispatch({
                type: FETCH_OPERATION,
                payload: axios.get(`/api/account/${this.props.current_account.id}/sheet/${this.props.current_sheet.id}/operation/${operation_id}`)
            })
        }
        else if(this.props.route.path === 'operation/new' && this.props.current_sheet.id !== 0){  // Demande de créa et fiche déjà consultée
            this.props.dispatch({   // On reset l'opération courante
                type: RESET_OPERATION,
            })
        }
        axios.get('/api/categories').then((response) => {
            _self.setState({ categories: response.data })
        })
    }
    onTitleChange(e){
        this.props.dispatch(changeOperationTitle(e.target.value))
    }
    onCategoryChange(e){
        var cat = this.state.categories.find((el) => { return el.id == e.target.value } );
        this.props.dispatch(changeOperationCategory(cat))
    }
    onAmountChange(e){
        this.props.dispatch(changeOperationAmount(e.target.value))
    }
    onTypeChange(e){
        this.props.dispatch(changeOperationType(e.target.value))
    }
    onCommentChange(e){
        this.props.dispatch(changeOperationComment(e.target.value))
    }
    handleSaveClick(e){
        var _self = this;
        var params = {
            label: this.props.current_operation.label,
            montant: this.props.current_operation.montant,
            type: this.props.current_operation.type,
            comment: this.props.current_operation.comment,
            category_id: this.props.current_operation.category.id
        };
        if(this.props.current_operation.id !== 0 && this.props.route.path !== 'operation/new'){
            axios.put(`/api/account/${this.props.current_account.id}/sheet/${this.props.current_sheet.id}/operation/${this.props.current_operation.id}`, params).then((response) => {
                if(response.status === 200){
                    _self.props.dispatch(changeSnackbarContext('Enregistré!'));
                    _self.props.dispatch(changeSnackbarVisibility(true));
                }
                else{
                    _self.props.dispatch(changeModalContext('Oups', `Une erreur s'est produite`))
                    _self.props.dispatch(changeModalVisibility(true))
                }
            }).catch(error => { // Impossible de récupérer le status code en erreur: bug connu de axios
                //if(error.reponse.status === 422){
                /*var err_msg = '';
                Object.keys(error.response.data.children).forEach((key,index) => {
                    if(Object.keys(error.response.data.children[key]).length > 0)
                        err_msg = error.response.data.children[key].errors[0]
                })*/
                _self.props.dispatch(changeModalContext('Oups', `L'un des champs est vide ou incorrect`))
                _self.props.dispatch(changeModalVisibility(true))
                //}
            });
        }
        else {
            axios.post(`/api/account/${this.props.current_account.id}/sheet/${this.props.current_sheet.id}/operation`, params).then((response) => {
                if(response.status === 201){
                    _self.props.dispatch(changeSnackbarContext('Opération crée!'));
                    _self.props.dispatch(changeSnackbarVisibility(true));
                    browserHistory.push('/sheet')
                }
                else{
                    _self.props.dispatch(changeModalContext('Oups', `Une erreur s'est produite`))
                    _self.props.dispatch(changeModalVisibility(true))
                }
            }).catch(error => {
                _self.props.dispatch(changeModalContext('Oups', `L'un des champs est vide ou incorrect`))
                _self.props.dispatch(changeModalVisibility(true))
            });
        }
    }
    handleDeleteClick(){
        var _self = this;
        axios.delete(`/api/account/${this.props.current_account.id}/sheet/${this.props.current_sheet.id}/operation/${this.props.current_operation.id}`)
        .then(response => {
            _self.props.dispatch(changeSnackbarContext('Opération effacée'));
            _self.props.dispatch(changeSnackbarVisibility(true));
            browserHistory.push(`/account/${this.props.current_account.id}/sheet/${this.props.current_sheet.id}`);
        }).catch(error => {
            _self.props.dispatch(changeModalContext('Oups', `Une errer s'est produite`))
            _self.props.dispatch(changeModalVisibility(true))
        })
    }
    render() {
        return (
            <div>

                    {(this.props.params.operation_id !== 0 && this.props.current_operation.id !== 0) ? (<h5>Opération <strong>{this.props.current_operation.label}</strong></h5>) : (<h5>Nouvelle opération sur fiche <strong>{this.props.current_sheet.name}</strong></h5>)}

                <Grid>
                    <Cell col={6}>
                        <Textfield
                            onChange={ this.onTitleChange }
                            label="Libellé..."
                            value={this.props.current_operation.label}
                            floatingLabel
                            style={{width: '100%'}}
                        />
                        <Textfield
                            label="Montant (€)"
                            value={this.props.current_operation.montant}
                            onChange={ this.onAmountChange }
                            floatingLabel
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Veuillez rentrer un nombre!"
                            style={{width: '150px'}}
                        />
                        <Textfield
                            onChange={ this.onCommentChange }
                            label="Commentaire..."
                            value={this.props.current_operation.comment}
                            rows={3}
                            style={{width: '100%'}}
                        />
                    </Cell>
                    <Cell col={6}>
                        <h5>Catégorie</h5>
                        <RadioGroup name="category" value={this.props.current_operation.category.id} onChange={ this.onCategoryChange }>
                            {this.state.categories.map((o, i) => {
                                return <Radio key={o.id} value={o.id} ripple>{o.label}</Radio>
                            })}
                        </RadioGroup>
                        <h5>Type dopération</h5>
                        <RadioGroup name="opType" value={this.props.current_operation.type.toString()} onChange={ this.onTypeChange }>
                            <Radio value="0" ripple>Débit</Radio>
                            <Radio value="1" ripple>Crédit</Radio>
                        </RadioGroup>
                    </Cell>
                    <Cell col={12}>
                        <Button raised ripple colored onClick={ this.handleSaveClick }>Enregistrer</Button>
                        {this.props.current_operation.id !== 0 &&
                            <Button raised ripple accent onClick={ this.handleDeleteClick }>Supprimer</Button>
                        }
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

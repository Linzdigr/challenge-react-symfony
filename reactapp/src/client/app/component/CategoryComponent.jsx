import React from 'react'
import { connect } from 'react-redux'

import { Link, browserHistory } from 'react-router'
import { Tooltip, FABButton, Icon, Textfield } from 'react-mdl'
import {
    changeModalContext,
    changeModalVisibility,
    changeSnackbarVisibility,
    changeSnackbarContext
} from '../actions'

import axios from 'axios'

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            rows: null,
            newCategoryRow: null,
            newLabel: '',
            newDescription: '',
            focus_edit_id: 0
        };
    }
    componentDidMount() {
        var _self = this;
        axios.get(`/api/categories`).then((response) => {
            if(response.status === 200)
                _self.setState({ categories: response.data });
            else{
                _self.props.dispatch(changeModalContext('Erreur', 'Une erreur est survenue pendant la récupération des données'));
                _self.props.dispatch(changeModalVisibility(true));
            }
        }).then(() => _self.updateRows() );
    }
    componentWillUnmount() {

    }
    onLabelChange(e){
        this.setState({ newLabel: e.target.value }, () => { debugger })
    }
    onDescriptionChange(e){
        this.setState({ newDescription: e.target.value })
    }
    handleModifyClick(category_object){
        this.setState({
            newCategoryRow: null,
            focus_edit_id: category_object.id,
            newLabel: category_object.label,
            newDescription: category_object.description
        }, this.updateRows);
    }
    handleDeleteClick(category_id){
        var _self = this;
        axios.delete(`/api/category/${category_id}`).then(response => {
            if(response.status === 204){
                _self.props.dispatch(changeSnackbarContext('Catégorie supprimée!'));
                _self.props.dispatch(changeSnackbarVisibility(true));
                var new_arr = _self.state.categories.filter(el => el.id !== category_id )
                _self.setState({ categories: new_arr })
            }
        }).then(() => _self.updateRows() )
    }
    handleSaveClick(e){
        var _self = this;

        if(!isNaN(parseFloat(e)) && isFinite(e)){   // Demande d'édition via id
            axios.put(`/api/category/${e}`, {
                label: _self.state.label,
                description: _self.state.newDescription
            }); // THEN
        }
        axios.post(`/api/category`, {
            label: _self.state.newLabel,
            description: _self.state.newDescription
        }).then(response => {
            if(response.status === 201){
                _self.props.dispatch(changeSnackbarContext('Categorie ajoutée!'));
                _self.props.dispatch(changeSnackbarVisibility(true));
                _self.setState({ newCategoryRow: null });
                _self.setState({ categories: _self.state.categories.concat(response.data) });
                _self.updateRows();
            }
            else{
                _self.props.dispatch(changeModalContext('Oups', `Une erreur s'est produite (code ${error.response.status})`));
                _self.props.dispatch(changeModalVisibility(true));
            }
        }).catch(error => {
            if(error.response){
                if(error.response.status === 422){
                    if(error.response.data.children){
                        var msg = [];
                        Object.keys(error.response.data.children).forEach((key) => {
                            if(typeof error.response.data.children[key].errors !== 'undefined')
                                msg.push(key + ': ' + error.response.data.children[key].errors[0]);
                        })
                        _self.props.dispatch(changeModalContext('Oups', `Les champs suivants comportent des erreurs: ${msg.join('<br />')}`));
                        _self.props.dispatch(changeModalVisibility(true));
                    }
                }
            }
            else{
                _self.props.dispatch(changeModalContext('Oups', `Une erreur s'est produite (code ${error.response.status})`));
                _self.props.dispatch(changeModalVisibility(true));
            }
        });
    }
    handleNewClick(e){
        this.setState({
            focus_edit_id: 0,
            newLabel: '',
            newDescription: '',
            newCategoryRow: (
            <tr key="new">
                <td className="mdl-data-table__cell--non-numeric">
                    <Textfield
                        onChange={this.onLabelChange.bind(this) }
                        label="Libellé..."
                        value={ this.state.newLabel }
                        style={{width: '100%'}}
                    />
                </td>
                <td>
                    <Textfield
                        onChange={ this.onDescriptionChange.bind(this) }
                        label="Description..."
                        value={ this.newDescription }
                        style={{width: '100%'}}
                    />
                </td>
                <td>-</td>
                <td>-</td>
                {/* Finally using programatic redirection instead of Link due to named route removed in react-router 2.0 (and then, not matching the correct active-tab) */}
                <td>
                    <a onClick={ this.handleSaveClick.bind(this) }>
                        <Tooltip label={<span><strong>Enregistrer</strong></span>} position="left">
                            <i className="material-icons">save</i>
                        </Tooltip>
                    </a>
                </td>
            </tr>
        )}, this.updateRows)
        window.scrollTo(0, document.body.scrollHeight);
    }
    genField(initial_val, fieldname, editable = false){
        if(!editable)
            return initial_val;
        var routineByFieldName = {
            label: this.onLabelChange.bind(this),
            description: this.onDescriptionChange.bind(this)
        };
        console.log('func onchange assigned: ', routineByFieldName[fieldname]);
        console.log('state data assigned: ', this.state['new' + fieldname.capitalize()]);

        /*var obj = {};
        obj['new' + fieldname.capitalize()] = initial_val;
        console.log('setState initial value: ', obj);
        console.log('giving: ', this.state['new' + fieldname.capitalize()]);

        this.setState(obj); // Populate initial corresponding value in state*/

        return (
            <Textfield
                onChange={ routineByFieldName[fieldname].bind(this) }
                label="Tapez votre texte..."
                value={ this.state['new' + fieldname.capitalize()] }
                style={{width: '100%'}}
            />
        )
    }
    updateRows(){
        var r = this.state.categories.map(o => {
            var editable = (this.state.focus_edit_id === o.id);
            return (
                <tr key={o.id}>
                    <td className="mdl-data-table__cell--non-numeric">{ this.genField(o.label, 'label', editable) }</td>
                    <td>{ this.genField(o.description, 'description', editable) }</td>
                    <td>{ o.created_at }</td>
                    <td>{ o.updated_at }</td>
                    <td>
                        <a onClick={ this.handleModifyClick.bind(this, o) } className="actionIcon">
                            <Tooltip label={<span><strong>Modifier</strong></span>} position="left">
                                <i className="material-icons">mode_edit</i>
                            </Tooltip>
                        </a>
                        <a onClick={ this.handleDeleteClick.bind(this, o.id) } className="actionIcon">
                            <Tooltip label={<span><strong>Effacer</strong></span>} position="left">
                                <i className="material-icons">delete_sweep</i>
                            </Tooltip>
                        </a>
                        {this.state.focus_edit_id !== 0 && editable &&
                            <a onClick={ this.handleSaveClick.bind(this, o.id) }>
                                <Tooltip label={<span><strong>Enregistrer</strong></span>} position="left">
                                    <i className="material-icons">save</i>
                                </Tooltip>
                            </a>
                        }
                    </td>
                </tr>
            )
        })
        this.setState({ rows: r });
    }
    render () {
        return (
            <div>
                <h5>Liste des catégories</h5>
               <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                   <thead>
                       <tr>
                           <th className="mdl-data-table__cell--non-numeric">Libellé</th>
                           <th>Description</th>
                           <th>Date de création</th>
                           <th>Date de modification</th>
                           <th></th>
                       </tr>
                   </thead>
                   <tbody>
                       { this.state.rows }
                       { this.state.newCategoryRow }
                   </tbody>
               </table>
               <FABButton className="fixedButton" colored ripple onClick={ this.handleNewClick.bind(this) }>
                   <Icon name="add" />
               </FABButton>
            </div>
        );
    }
}

export default connect()(Category);

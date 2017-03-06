import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { IconButton, Menu, MenuItem, Snackbar } from 'react-mdl'
import { changeModalVisibility, changeSnackbarVisibility } from './actions'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from 'react-mdl'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    handleCloseDialog() {
        this.props.dispatch(changeModalVisibility(false));
    }
    handleTimeoutSnackbar(){
        this.props.dispatch(changeSnackbarVisibility(false));
    }
    handleClickHelp(){
        browserHistory.push('/help');
    }
    handleClickCategory(){
        browserHistory.push('/category');
    }
    render () {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">Ykeo</span>
                    </div>
                    <div className="menuWrapper">
                        <IconButton name="more_vert" id="demo-menu-lower-right" />
                        <Menu target="demo-menu-lower-right" align="right">
                            <MenuItem onClick={ this.handleClickCategory.bind(this) }>Gérer les catégories</MenuItem>
                            <MenuItem onClick={ this.handleClickHelp.bind(this) }>Aide</MenuItem>
                        </Menu>
                    </div>
                    <div className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-layout--large-screen-only">
                        <Link className="mdl-layout__tab" activeClassName="is-active" to="/home">Comptes</Link>
                        <Link className={ (this.props.current_account.id === 0) ? 'mdl-layout__tab disabled' : 'mdl-layout__tab' } activeClassName="is-active" to="/account">Fiches</Link>
                        <Link className={ (this.props.current_sheet.id === 0) ? 'mdl-layout__tab disabled' : 'mdl-layout__tab' } activeClassName="is-active" to="/sheet">Operations</Link>
                        <Link className={ (this.props.current_operation.id === 0) ? 'mdl-layout__tab disabled' : 'mdl-layout__tab' } activeClassName="is-active" to="/operation">Operation Courante</Link>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Ykeo Nav</span>
                    <nav className="mdl-navigation">
                        <Link className="mdl-layout__tab" activeClassName="is-active" to="/home">Comptes</Link>
                        <Link className={ (this.props.current_account.id === 0) ? 'mdl-layout__tab disabled' : 'mdl-layout__tab' } activeClassName="is-active" to="/account">Fiches</Link>
                        <Link className={ (this.props.current_sheet.id === 0) ? 'mdl-layout__tab disabled' : 'mdl-layout__tab' } activeClassName="is-active" to="/sheet">Operations</Link>
                        <Link className={ (this.props.current_operation.id === 0) ? 'mdl-layout__tab disabled' : 'mdl-layout__tab' } activeClassName="is-active" to="/operation">Operation Courante</Link>
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    {this.props.children}
                </main>

                <Dialog open={this.props.modal.visible}>
                    <DialogTitle>{this.props.modal.title}</DialogTitle>
                    <DialogContent>
                        <p>
                            {this.props.modal.text}
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.handleCloseDialog}>OK</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    active={this.props.snackbar.visible}
                    onTimeout={this.handleTimeoutSnackbar}
                    >
                        {this.props.snackbar.text}
                </Snackbar>
            </div>
        );
    }
}

export default connect((state) => {
    return { modal: state.modal, snackbar: state.snackbar, current_sheet: state.naviguation.current_sheet, current_account: state.naviguation.current_account, current_operation: state.naviguation.current_operation }
})(App);

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
                            <MenuItem>Gérer les catégories</MenuItem>
                            <MenuItem>Aide</MenuItem>
                        </Menu>
                    </div>
                    <div className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-layout--large-screen-only">
                        <Link className="mdl-layout__tab" activeClassName="is-active" to="/home">Accueil</Link>
                        <Link className="mdl-layout__tab" activeClassName="is-active" to="/account">Compte</Link>
                        <Link className="mdl-layout__tab" activeClassName="is-active" to="/sheet">Fiche</Link>
                        <Link className="mdl-layout__tab" activeClassName="is-active" to="/operation">Operation</Link>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Ykeo Nav</span>
                    <nav className="mdl-navigation">
                        <Link className="mdl-layout__tab" activeClassName="is-active" to="/home">Accueil</Link>
                        <Link className="mdl-layout__tab" activeClassName="is-active" to="/account">Compte</Link>
                        <Link className="mdl-layout__tab" activeClassName="is-active" to="/sheet">Fiche</Link>
                        <Link className="mdl-layout__tab" activeClassName="is-active" to="/operation">Operation</Link>
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
    return { modal: state.modal, snackbar: state.snackbar }
})(App);

import React from 'react';
import { connect } from 'react-redux'

import { Link, browserHistory } from 'react-router'

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {

    }
    render () {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">Ykeo</span>
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
            </div>
        );
    }
}

export default connect((state) => {
    return { account: state.naviguation.current_account }
})(App);

import React from 'react'
import { connect } from 'react-redux'

class Help extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    render () {
        return (
            <div>
                <h5>Help</h5>
                <strong>Comment se servir de Yeko?</strong><br />
                <span>
                    L'application est une Single-Page Application, ainsi, vous n'avez pas à recharger la page.<br />
                    Il est important de comprendre le fonctionnement des comptes, fiches et opérations:<br />
                    Vous ne pouvez pas accéder à une fiche et à plus forte raison une opération si vous n'avez pas consulté un compte auparavant!<br />
                    L'application se souvient donc de la dernière instance de compte, fiche et opération consulté(e).<br />
                    Ainsi, il est nécessaire lors de l'arrivée intiale sur la page que vous choisissiez dans l'ordre un compte puis une fiche de compte afin d'accéder à une opération donnée.<br />
                </span>
                <span>
                    TODOs:
                    Utilisation du localStorage pour la persistance des données de saisie & cie.<br />
                    Factorisation de certains blocs de code en composant React.<br />
                    Mise à jour de react-mdl à la sortie de la version 2.0 pour corriger certains bugs d'affichage connus.<br />
                    Utilisation de use-named-route pour réduire la verbosité du code tout en ayant les active-routes styles appliqués sur les éléments concernant de multiples routes.
                </span>
            </div>
        );
    }
}

export default connect()(Help);

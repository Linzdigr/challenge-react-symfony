import React from 'react';
import ReactDOM from 'react-dom';


import DataTable from 'react-mdl/lib/DataTable/Table';
import TableHeader from 'react-mdl/lib/DataTable/TableHeader';
import Selectable from 'react-mdl/lib/DataTable/Selectable';
import Sortable from 'react-mdl/lib/DataTable/Sortable';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likesCount : 0,
            accounts: [
                {name: 'Compte perso', sheetcount: 25, opcount: 250},
                {name: 'Comtpe Commun', sheetcount: 50, opcount: 190}
            ]
        };
        this.onLike = this.onLike.bind(this);
    }
    onLike () {
        let newLikesCount = this.state.likesCount + 1;
        this.setState({likesCount: newLikesCount});
    }
   render() {
      return (
         <div>
            <DataTable rows={ this.state.accounts } selectable sortable>
                <TableHeader name="name" tooltip="Nom">Nom</TableHeader>
                <TableHeader numeric name="sheetcount" tooltip="Nombre de fiches">Nombre de fiches</TableHeader>
                <TableHeader numeric name="opcount" tooltip="Nombre d'opérations">Nombre d'opérations</TableHeader>
            </DataTable>
         </div>
      )
   }
}

export default Account;

import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link } from 'react-router'
import AwesomeComponent from './AwesomeComponent.jsx';

class App extends React.Component {
    render () {
        return (
            <div>
                <AwesomeComponent />
            </div>
        );
    }
}

export default App;

class Home extends React.Component {
   render() {
      return (
         <div>
            <h1>Home...</h1>
         </div>
      )
   }
}

export default Home;

ReactDOM.render((
    <Router history = {browserHistory}>
        <Route path = "/" component = {App}>
            <IndexRoute component = {Home} />
            <Route path = "home" component = {Home} />
        </Route>
    </Router>

), document.getElementById('app'))

render(<App/>, document.getElementById('app'));

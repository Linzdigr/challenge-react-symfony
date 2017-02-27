import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

import Home from './HomeComponent.jsx';
import Sheet from './SheetComponent.jsx';

import { Button, Card, Checkbox, CardText } from 'react-mdl';
import Header from 'react-mdl/lib/Layout/Header';
import Drawer from 'react-mdl/lib/Layout/Drawer';
import Navigation from 'react-mdl/lib/Layout/Navigation';
import Content from 'react-mdl/lib/Layout/Content';
import Layout from 'react-mdl/lib/Layout/Layout';

class App extends React.Component {
    render () {
        return (
            <div style={{height: '300px', position: 'relative'}}>
                <Layout style={{background: 'url(http://www.getmdl.io/assets/demos/transparent.jpg) center / cover'}}>
                    <Header transparent title="Title" style={{color: 'white'}}>
                        <Navigation>
                            <ul>
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/sheet">Sheet</Link></li>
                            </ul>
                            </Navigation>
                    </Header>
                    <Drawer title="Title">
                        <Navigation>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                        </Navigation>
                    </Drawer>
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default App;

ReactDOM.render((
    <Router history = {browserHistory}>
        <Route path = "/" component = {App}>
            <IndexRoute component = {Home} />
            <Route path = "home" component = {Home} />
            <Route path = "sheet" component = {Sheet} />
        </Route>
    </Router>

), document.getElementById('app'))

// render(<App/>, document.getElementById('app'));

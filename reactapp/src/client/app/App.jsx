import React from 'react';

import { Link, browserHistory } from 'react-router'

import { Button, Card, Checkbox, CardText } from 'react-mdl';
import Header from 'react-mdl/lib/Layout/Header';
import HeaderRow from 'react-mdl/lib/Layout/HeaderRow';
import HeaderTabs from 'react-mdl/lib/Layout/HeaderTabs';
import Drawer from 'react-mdl/lib/Layout/Drawer';
import Navigation from 'react-mdl/lib/Layout/Navigation';
import Content from 'react-mdl/lib/Layout/Content';
import Layout from 'react-mdl/lib/Layout/Layout';
import Spacer from 'react-mdl/lib/Layout/Spacer';
import Tab from 'react-mdl/lib/Tabs/Tab';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1
        };
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    changeRoute(tabId){
        switch(tabId){
            case 1:
                browserHistory.push('/sheet');
                break;
            case 2:
                browserHistory.push('/operation');
                break;
            default:
                browserHistory.push('/account');
            this.setState({ activeTab: tabId });
        }
    }
    render () {
        return (
            <div style={{height: '300px', position: 'relative'}}>
                <Layout fixedHeader fixedTabs>
                    <Header>
                        <HeaderRow title="Ykeo" />
                        <HeaderTabs ripple activeTab={0} onChange={ this.changeRoute }>
                            <Tab>Comptes</Tab>
                            <Tab>Fiches</Tab>
                            <Tab>Operations</Tab>
                        </HeaderTabs>
                    </Header>
                    <Drawer title="Ykeo Nav">
                        <Navigation>
                            <li><Link to="/account">Comptes</Link></li>
                            <li><Link to="/sheet">Fiches</Link></li>
                            <li><Link to="/operation">Operations</Link></li>
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

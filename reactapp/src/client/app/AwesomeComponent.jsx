import React from 'react';
import { Button, Card, Checkbox, CardText } from 'react-mdl';
import Header from 'react-mdl/lib/Layout/Header';
import Drawer from 'react-mdl/lib/Layout/Drawer';
import Navigation from 'react-mdl/lib/Layout/Navigation';
import Content from 'react-mdl/lib/Layout/Content';
import Layout from 'react-mdl/lib/Layout/Layout';

class AwesomeComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {likesCount : 0};
        this.onLike = this.onLike.bind(this);
    }

    onLike () {
        let newLikesCount = this.state.likesCount + 1;
        this.setState({likesCount: newLikesCount});
    }

    render() {
        return (
            <div style={{height: '300px', position: 'relative'}}>
                <Layout style={{background: 'url(http://www.getmdl.io/assets/demos/transparent.jpg) center / cover'}}>
                    <Header transparent title="Title" style={{color: 'white'}}>
                        <Navigation>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
                            <a href="">Link</a>
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

                    </Content>
                </Layout>
            </div>
        );
    }
}

export default AwesomeComponent;

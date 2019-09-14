import React, { Component } from 'react';
import memoryUtil from '../../utils/memory'
import {Redirect, Route, Switch} from 'react-router-dom'
import { Layout } from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/leftNav'
import Home from '../home/home'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Category from '../category/category'

const {Footer, Sider, Content } = Layout;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const user = memoryUtil.user;
        if(JSON.stringify(user)=='{}'){
            //没有登录则返回登录界面
            return <Redirect to='/login'/>
        }
        return ( 
            // <div>欢迎你，{user.username}</div>
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/category' component={Category}></Route>
                            {/* 不匹配则跳转到home路由 */}
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{background:'#ccc', textAlign: "center"}}>@whg</Footer>
                </Layout>
            </Layout>
         );
    }
}
 
export default Admin;
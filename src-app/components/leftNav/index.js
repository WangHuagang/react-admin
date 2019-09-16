import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import './index.less'
import { Menu, Icon } from 'antd';
import MenuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentWillMount() {
        //render 之前获取菜单标签
        this.menulist = this.getMenu(MenuList)
    }

    render() { 
        // 获取当前路由名称
        const path = this.props.location.pathname
        const openKey = this.openKey
        return (
            <div className='left-nav'>
                <Menu
                    defaultSelectedKeys={[path]}
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    >
                     {
                        //  通过函数获取菜单标签
                         this.menulist
                     }       
                </Menu>
            </div>
        )
    }

    getMenu = (menuList) => {
        // 获取当前路由名称
        const path = this.props.location.pathname
        return menuList.map(item => {
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else {
                //获取需要展开的二级菜单
                if(item.children.find(child => child.key === path)){
                    //将需要展开的key存在当前组件对象的this中
                    this.openKey = item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {/* 使用递归去遍历生成二级菜单 */}
                        {
                            this.getMenu(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    }
}
//  withRouter 是一个高阶组件，接受一个组件，并返回一个新的组件(即将 非路由组件转换成 路由组件 ,二者区别在于props中是否有location等三个属性) 
// props中返回三个属性 history/location/math
export default withRouter(LeftNav);
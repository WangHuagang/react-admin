import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import './index.less'
import memoryUtil from '../../utils/memory'
import {formateDate} from '../../utils/formateDate'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import localStorageUtil from '../../utils/localStorage'
import LinkBtn from '../linkBtn'

const { confirm } = Modal;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currTime: formateDate(Date.now())
         }
    }

    getTime = () => {
        this.interval = setInterval(()=>{
            const currTime = formateDate(Date.now())
            this.setState({currTime})
        },1000)
    }

    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        menuList.map( item => {
            if(item.key === path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(child => child.key === path)
                if(cItem) title = cItem.title
            }
        })
        return title
    }

    componentDidMount() {
        this.getTime()
    }

    componentWillUnmount() {
        //清楚定时器
        clearInterval(this.interval)
    }

    logout = () => {
        confirm({
            title: '确定退出吗？',
            // content: 'Some descriptions',
            onOk: () => {
                // console.log('OK');
                //删除保存的user的数据
                localStorageUtil.removeUser()
                memoryUtil.user = {}
                this.props.history.replace('/login')
            },
            onCancel() {
                // console.log('Cancel');
            },
            });
    }

    render() { 
        const {username} = memoryUtil.user
        const {currTime} = this.state
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎你，{username}</span>
                    <LinkBtn onClick={this.logout}>退出</LinkBtn>
                </div>
                <div className='header-bottom'>
                    <div className='left'>{ title}</div>
                    <div className='right'>
                        <span>{currTime}</span>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default withRouter(Header);
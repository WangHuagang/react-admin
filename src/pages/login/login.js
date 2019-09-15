import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import './login.less'
import {reqLogin} from '../../api'
import memoryUtil from '../../utils/memory'
import localStorageUtil from '../../utils/localStorage'
import { from } from 'rxjs';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        //判断是否已经登录，若已经登录直接跳转
        const user = memoryUtil.user;
        if(JSON.stringify(user)!='{}'){
            return <Redirect to='/'/>
        }

        const form = this.props.form;
        const { getFieldDecorator } = form;
        return ( 
            <div className='login'>
                <header className='login-header'>
                    <h1>后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username',{
                                    rules: [
                                        { required: true, whitespace: true, message: '用户名必须填写！' },
                                        { min: 4, message: '用户名长度至少为4位！' },
                                        { max: 12, message: '用户名长度最多为12位！' },
                                        { pattern: /^[0-9a-zA-Z_]+$/, message: '用户名只能为数字、字母、下划线组成！' },
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    rules: [
                                        {
                                            //自定义验证函数
                                            validator: this.validatorPwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </section>
            </div>
        );
    }
    handleSubmit = (event) => {

        //阻止事件的默认行为;
        event.preventDefault();
        //点击登录时进行校验
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                const {username, password} = values;
                //promise方式异步处理
                // reqLogin(username,password).then(res => {
                //     console.log(res)
                // })

                //asnyc await 方式获取数据
                const res = await reqLogin(username,password)
                //将用户信息保存到内存中
                memoryUtil.user = res.data
                //将用户信息保存到localstorage中
                localStorageUtil.setUser(res.data)
                //登录成功跳转
                //repalace替换当前路由，不能再回退到当前路由
                this.props.history.replace('/')
                //push新增路由，可以再回退到当前路由
                // this.props.history.push('/')
            }
        });
        //获取表单数据
        // const form = this.props.form;
        // const value = form.getFieldsValue();
        // console.log(value)
    }
    //表单自定义校验函数
    validatorPwd = (rule, value, callback) => {
        // callback() 必须调用，并且返回指定的提示信息，不返回值则代表验证通过
        let msg;
        if(!value){
            msg = '密码不能为空'
        }else if(value.length < 4){
            msg = '密码不能小于4位'
        }else if(value.length > 12){
            msg = '密码不能大于12位'
        }else if(!/^[0-9a-zA-Z]+$/.test(value)){
            msg = '密码只能为数字、字母、下划线组成'
        }else {
            msg = ''
        }
        if(msg) {
            //验证失败并返回指定的错误提示信息
            callback(msg)
        }else {
            //验证通过
            callback()
        }
    }
}
/*
    高阶函数：
        一个函数传入的参数为函数或者返回的是一个函数（eg： fn()()）
        常见的高阶函数： setTimeOut(),数组的遍历函数filter()/map()等等

    高阶组件：（如：Form.create()(Login)）
        本质是一个函数，接受一个组件，并返回一个新的组件，包装组件会向被包装组件传入特定的属性（在props中传入）
        组件本质就是一个函数
        高阶组件也是高阶函数： 接受一个组件函数，返回的也是一个组件函数
*/

// 通过高阶函数包装一个Login组件，然后通过函数返回一个组件函数（新的组件），在props中传递form
const WrapLogin = Form.create()(Login)
 
export default WrapLogin;
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import memoryUtil from './utils/memory'
import localStorageUtil from './utils/localStorage'

//读取localstorage中的用户信息到内存中去
memoryUtil.user = localStorageUtil.getUser()

ReactDOM.render(<App />, document.getElementById('root'));
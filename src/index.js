import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import store from './redux/store'

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

store.subscribe(()=>{
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
})
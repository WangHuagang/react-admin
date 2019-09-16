/* 
封装axios库发送请求
优化：统一处理请求异常,在外面包一层promise进行返回请求结果以及异常情况
*/

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data = {}, type = "GET"){ 
    let promise;
    return new Promise((r,j)=>{

        if(type === 'GET'){
            promise =  axios.get(url, {params: data})
        }else {
            promise =  axios.post(url, data)
        }
        //请求成功回调函数
        promise.then(res => {
            r(res.data)
        })
        //请求失败回调
        .catch(err=>{
            //这里不能使用j()返回错误信息，不然不能达到同意处理异常的目的
            message.error('请求出错了：'+err.message)
        })
    })
    
}
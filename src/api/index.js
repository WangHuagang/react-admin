/*
包含应用中所有接口请求函数的模块
每个函数都返回promise
*/

import ajax from './ajax'

export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')

//分类数据
export const reqGetCategoryList = () => ajax('/category')
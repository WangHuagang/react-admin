/*
用于存储，读取，删除locastorage中的用户信息
*/

export default {
    setUser(user){
        localStorage.setItem('user',JSON.stringify(user))
    },

    getUser(){
        //还需要处理为null的情况，转换成{}防止报错
        return JSON.parse(localStorage.getItem('user') || '{}')
    },

    removeUser(){
        localStorage.removeItem('user')
    }
}
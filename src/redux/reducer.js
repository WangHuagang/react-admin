import {ADD,SHORT} from './action-type'

export default function reducer(state=0, action){
    switch(action.type){
        case ADD:
            return state + action.num
        case SHORT:
            return state - action.num
        default:
            return state
    }
}
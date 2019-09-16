
import {ADD, SHORT} from './action-type'

export const addAction = num => ({type:ADD,num:num})

export const shortAction = num => ({type:SHORT,num:num})
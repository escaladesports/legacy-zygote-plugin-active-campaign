import fetch from 'isomorphic-fetch'
import { createCustomer } from './utils/apiRequests'
import { EcomCustomer } from './utils/dataFormatter'

const postInfo = async (data) => {
    console.log(`DATA FROM POSTINFO in ac plugin: `, data)
    
    createCustomer(`John Smith`)

    // this will get passed on
    return data
}

const preOrder = async (data) => {
    console.log(`preOrder: `, data)
    return data
}

export { preOrder, postInfo }
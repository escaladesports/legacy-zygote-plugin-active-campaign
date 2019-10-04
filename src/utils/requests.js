import fetch from 'isomorphic-fetch'
import buildFiltersString from './dataFormatter'

const getACItem = async type => {
    let response
    
    try {
        let response = await fetch(`/api/3/${type}`, {
            method: `GET`,
            body: JSON.stringify(data)
        })
    }
    catch(err) {
        console.error(`Error occured getting item: `, err)
        return null
    }

    let res = await response.json()
    console.log(`response from getACItem: `, res)

    return res
}

const getACItemById = async (type, id) => {
    let response

    try {
        let response = await fetch(`/api/3/${type}/${id}`, {
            method: `GET`,
            body: JSON.stringify(data)
        })
    }
    catch(err) {
        console.error(`Error occured getting filtered item: `, err)
        return null
    }

    let res = await response.json()
    console.log(`response from getACItemById: `, res)

    return res
}

const getFilteredACItem = async (type, filters) => {
    let response

    try {
        response = await fetch(`/api/3/${type}${buildFiltersString(filters)}`, {
            method: `GET`
        })
    }
    catch (err) {
        console.error(`Error occured getting filtered item: `, err)
        return null
    }

    let res = await response.json()
    console.log(`response from getFilteredACItem: `, res)
    
    return res
}

const postACItem = async (type, data) => {
    let response

    try {
        response =  await fetch(`/api/3/${type}`, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
    }
    catch (err) {
        console.error(`Error occured during post: `, err)
        return null
    }

    let res = await response.json()
    console.log(`response from postACItem: `, res)

    return res
}


export { getACItem, getACItemById, getFilteredACItem, postACItem }
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

    let data = await response.json()
    console.log(`response from getACItem: `, data)

    return data
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

    let data = await response.json()
    console.log(`response from getACItemById: `, data)

    return data
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

    let data = await response.json()
    console.log(`response from getFilteredACItem: `, data)
    
    return data
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

    let data = await response.json()
    console.log(`response from postACItem: `, data)

    return data
}


export { getACItem, getACItemById, getFilteredACItem, postACItem }
import fetch from 'isomorphic-fetch'
import buildFiltersString from './dataFormatter'

const getACItem = async (type) => {
    return await fetch(`/api/3/${type}`, {
        method: `GET`,
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log(`getACItem res: `, res)
        return res.json()
    })
}

const getACItemById = async (type, id) => {
    return await fetch(`/api/3/${type}/${id}`, {
        method: `GET`,
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log(`getACItemById res: `, res)
        return res.json()
    })
}

const getFilteredACItem = async (type, filters) => {
    return await fetch(`/api/3/${type}${buildFiltersString(filters)}`, {
        method: `GET`
    })
    .then(res => {
        console.log(`getFilteredACItem res: `, res)
        return res.json()
    })
}

const postACItem = async (type, data) => {
    return await fetch(`/api/3/${type}`, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log(`postACItem res: `, res)
        return res.json()
    })
}


export { getACItem, getACItemById, getFilteredACItem, postACItem }
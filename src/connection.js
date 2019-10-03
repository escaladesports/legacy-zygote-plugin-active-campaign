import fetch from 'isomorphic-fetch'

// GET all connections
const getAllConnections = async () => {
    return await fetch( `/api/3/connections`, {
        method: `GET`
    })
    .then(res => console.log(`getAllConnections res: `, res))
}

// GET filtered connections
const getFilteredConnections = async (filter, value) => {
    return await fetch(`/api/3/connections?filters[${filter}]=${value}`,{
        method: `GET`
    })
    .then(res => console.log(`getFilteredConnections res: `, res))
}

// POST new connection
const createConnection = async (data) => {
    return await fetch(`/api/3/connections`, {
        method: `POST`,
        body: JSON.stringify(data)
    })
    .then(res => console.log(`createConnection res: `, res))
}

export { getAllConnections, getFilteredConnections, createConnection, testCreateConnectionJSON }
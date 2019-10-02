import fetch from 'isomorphic-fetch'

// POST new ecom customer
const createEcomOrder = async (data) => {
    return await fetch(`/api/3/ecomOrders`, {
        method: `POST`,
        body: JSON.stringify(data)
    })
    .then(res => console.log(`createEcomOrder res: `, res))
}

export { createEcomCus }
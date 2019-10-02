import fetch from 'isomorphic-fetch'

// POST new ecom customer
const createEcomCus = async (data) => {
    return await fetch(`/api/3/ecomCustomers`, {
        method: `POST`,
        body: JSON.stringify(data)
    })
    .then(res => console.log(`createEcomCus res: `, res))
}

export { createEcomCus }
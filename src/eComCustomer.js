import { createEcomCusObj } from './utils/dataFormatter'
import { getFilteredACItem, postACItem } from './utils/requests'


const createEcomCus = async (connectionid, acceptsMarketing, data) => {
    let customer = createEcomCusObj(connectionid, ``, )
    return await postACItem(`ecomCustomers`, customer)
}

const getEcomCus = async (connectionid, email) => {
    // filters for getting customer
    let filters = [
        { filter: `connectionid`, value: connectionid },
        { filter: `email`, value: email }
    ]

    let customer = await getFilteredACItem(`ecomCustomers`, filters)

    customer = ecomCustomers.length ? res.ecomCustomers : null

    return customer

}

// Always returns a customer resource
const handleEcomCus = async (connectionid, acceptsMarketing, info) => {
    
    // try get customer
    let eComCustomer = await getEcomCus(connectionid, info.infoEmail)
    
    // if customer resource does not exist
    if(!eComCustomer) {
        eComCustomer = await createEcomCus(connectionid, info.infoEmail, `0`)
    }

    return eComCustomer
}

export { createEcomCus, getEcomCus, handleEcomCus}
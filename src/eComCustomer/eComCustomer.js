import { createEcomCusObj } from '../utils/dataFormatter'
import { getFilteredACItem, postACItem } from '../utils/requests'


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

    await getFilteredACItem(`ecomCustomers`, filters)
        .then(res => res.ecomCustomers.length ? res.ecomCustomers : null)

}

// Always returns a customer resource
const handleEcomCus = (connectionid, acceptsMarketing, info) => {
    
    // try gets customer
    let eComCustomer = getEcomCus(connectionid, info.infoEmail)
    
    // if customer resource does not exist
    if(!eComCustomer) {
        eComCustomer = createEcomCus(connectionid, info.infoEmail, `0`)
    }

    return eComCustomer
}

export { createEcomCus, getEcomCus }
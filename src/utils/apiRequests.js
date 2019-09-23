// import fetch from 'isomorphic-fetch'

function createConnection() {

}

function createCustomer(customer) {
    // create customer in AC
    console.log(`Creating customer: `, customer)

    // return fetch(url, {
    //     method: `GET`,
    //     body: data,
    //     headers: {
    //         "Api-Token": key
    //     }
    // })
    // .then(res => res)

    return customer
}



export { createCustomer }
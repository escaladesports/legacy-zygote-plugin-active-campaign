import acState from '../../state'
import { getFilteredACItem, postACItem } from '../utils'

/*
    Active Campaign Base Object Class Definition
    Houses functions used by classes that extend this class
*/
export default class {

    /*
        Constructor -
        pull values from props before using default values
    */
    constructor(props = {}) {

    }

    /*
        function for returning an object ready for API requests
    */
    requestJson(propName) { return { [propName]: { ...this } } }

    /*
        function for `GET` requests to Active Campaign API
        API returns a list of data based on passed in filters
        this function returns the first object in the array
    */
    async getObjectByFilters({ acEndpoint, filters }) {
        console.log(`getObject ${acEndpoint} running...`)

        let acItem
        await getFilteredACItem(acEndpoint, filters)
            .then(itemJson => {
                if (itemJson && itemJson.length) acItem = itemJson[0]
            })

        console.log(`getObject ${acEndpoint} returning: `, acItem)
        return acItem
    }

    /*
        function for `POST` requests to Active Campaign API
        API returns an object with a property matching the searched object
    */
    async createObject({ acEndpoint, bodyJson, propName }) {
        console.log(`createObject ${acEndpoint} running...`)

        let acItem
        await postACItem(acEndpoint, bodyJson)
            .then(response => acItem = response ? response[propName] : null)

        console.log(`createObject ${acEndpoint} returning: `, acItem)
        return acItem
    }

    /*
        function for initializing Active Campaign Objects
        Will fetch object from state first, then API, then create it if needed
    */
    async init(propName, getFunc, createFunc) {
        console.log(`${propName}.init running...`)

        let acItem = acState.state[propName] || null
        if (!acItem) {
            await getFunc()
                .then(itemJson => acItem = itemJson)

            if (!acItem) {
                await createFunc()
                    .then(itemJson => acItem = itemJson)
            }
            acState.setState({ [propName]: acItem })
        }
        console.log(`${propName}.init returning: `, acItem)
        return acItem
    }
}
import acState from '../../state'
import { getFilteredACItem, postACItem } from '../utils'


export function requestJson(propName, obj) {
    return { [propName]: { ...obj } }
}

export async function getObjectByFilters({ acEndpoint, filters }) {
    console.log(`getObject ${acEndpoint} running...`)

    let acItem
    await getFilteredACItem(acEndpoint, filters)
        .then(itemJson => {
            if (itemJson && itemJson.length) acItem = itemJson[0]
        })

    console.log(`getObject ${acEndpoint} returning: `, acItem)
    return acItem
}

export async function createObject({ acEndpoint, bodyJson, propName }) {
    console.log(`createObject ${acEndpoint} running...`)

    let acItem
    await postACItem(acEndpoint, bodyJson)
        .then(response => acItem = response ? response[propName] : null)

    console.log(`createObject ${acEndpoint} returning: `, acItem)
    return acItem
}
    
    
export async function init(propName, getFunc, createFunc) {
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



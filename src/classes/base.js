import acState from '../state'
import { getFilteredACItem, postACItem, logger } from '../utils'


export function requestJson(propName, obj) {
    return { [propName]: { ...obj } }
}

export async function getObjectByFilters({ acEndpoint, filters }) {
    logger(`getObject ${acEndpoint} running...`)

    let acItem
    await getFilteredACItem(acEndpoint, filters)
        .then(itemJson => {
            if (itemJson && itemJson.length) acItem = itemJson[0]
        })

    logger(`getObject ${acEndpoint} returning: `, acItem)
    return acItem
}

export async function createObject({ acEndpoint, bodyJson, propName }) {
    logger(`createObject ${acEndpoint} running...`)

    let acItem
    await postACItem(acEndpoint, bodyJson)
        .then(response => acItem = response ? response[propName] : null)

    logger(`createObject ${acEndpoint} returning: `, acItem)
    return acItem
}
    
    
export async function init(propName, getFunc, createFunc) {
    logger(`${propName}.init running...`)

    let acItem = acState.state[propName] || null
    if (!acItem) {
        await getFunc()
            .then(itemJson => acItem = itemJson)

        if (!acItem) {
            await createFunc()
                .then(itemJson => acItem = itemJson)
        }

        acState.setState({ [propName]: { ...acItem }})
    }

    logger(`${propName}.init returning: `, acItem)
    logger(`${propName} init state: `, acState.state[propName])
    return acItem
}

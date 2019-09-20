import fetch from 'isomorphic-fetch'



const preInfo = (data) => {
    console.log(`DATA FROM PREINFO in ac plugin: `, data)

    // this will get passed on
    return data
}

const preOrder = (data) => {
    console.log(`preOrder: `, data)
    return data
}

const connectionObj = {
    "connection": {
      "service": "Zygote",
      "externalid": "victory-tailgate",
      "name": "Victory Tailgate",
      "logoUrl": "http://example.com/i/foo.png",
      "linkUrl": "http://example.com/foo/"
    }
}

// Creates connection
// Connection: 
const connection = async (url, key, data) => {

    return fetch(url, {
        method: `GET`,
        body: data,
        headers: {
            "Api-Token": key
        }
    })
    .then(res => res)
    
}

export { preOrder, preInfo, connection }
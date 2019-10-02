// Creates connection object
function createConnectionObj() {
    return {
        connection: {
          service: "Zygote Cart",
          externalid: Math.floor(Math.random() * Math.floor(100000000)).toString(),
          name: "Test 123",
          logoUrl: "http://example.com/i/foo.png",
          linkUrl: "http://example.com/foo/"
        }
    }
}

export { createConnectionObj }

// > Deep Data Formatting

// Formats for creating a connection
function formatConnection(data) {
    return {
        connection: {
          service: "Zygote Cart",
          externalid: "victorytailgate",
          name: "Victory Tailgate",
          logoUrl: "https://www.victorytailgate.com/static/b4eddb23afbb2351da482c611c8a476d/3fa08/vt-logo-2.png",
          linkUrl: "https://www.victorytailgate.com/"
        }
      }
}

// Formats customer to match format for Active Campaign
function formatEcomCustomer(customer) {
	return {
        ecomCustomer: {
          connectionid: "1",
          externalid: "56789",
          email: "alice@example.com",
          acceptsMarketing: "1"
        }
    }
}
// < Deep Data Formatting

export { formatConnection, formatEcomCustomer }
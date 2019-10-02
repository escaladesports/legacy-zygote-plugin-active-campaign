// Creates connection object
function createConnectionObj(sitename, linkUrl) {
    return {
        connection: {
          service: `Zygote Cart`,
          externalid: sitename,
          name: sitename,
          logoUrl: "http://example.com/i/foo.png",
          linkUrl
        }
    }
}

// Creates contact object
function createContactObj(email = ``, firstName = ``, lastName = ``, phone = ``) {
  return {
    contact: {
      email,
      firstName,
      lastName,
      phone
    }
  }
}

// Creates contact object
function createEcomCusObj(connectionid, externalid = ``, email = ``, acceptsMarketing = `0`) {
  return {
    ecomCustomer: {
      connectionid,
      externalid,
      email,
      acceptsMarketing // default accepting marketing to false
    }
  }
}

function getFirstName(fullName) {
  if(fullName.indexOf(` `) > 0) return fullName.split(` `)[0]
  return ` `
}

function getLastName(fullName) {
  if(fullName.indexOf(` `) > 0) return fullName.split(` `)[fullName.split(` `).length - 1]
  return ` `
}

// > Order Objects

function createEcomOrder() {
  return {
    ecomOrder: {
      externalid: "3246315233",
      source: "1",
      email: "johndoe@gmai.com",
      orderProducts: [
        {
          externalid: "PROD23456",
          name: "Skateboard",
          price: 3000,
          quantity: 1,
          category: "Toys",
          sku: "SK8BOARD145",
          description: "lorem ipsum...",
          imageUrl: "https://example.com/product.jpg",
          productUrl: "https://store.example.com/product45678"   
        }
      ],
      orderUrl: "https://example.com/orders/3246315233",
      externalCreatedDate: "2019-09-30T17:41:39-04:00",
      externalUpdatedDate: "2019-09-30T17:41:39-04:00",
      shippingMethod: "UPS Ground",
      totalPrice: 9111,
      shippingAmount: 200,
      taxAmount: 500,
      discountAmount: 100,
      currency: "USD",
      orderNumber: "myorder-123",
      connectionid: "15",
      customerid: "5"
    }
  }
}

function createEcomProduct() {
  return {
    externalid: "PROD23456",
    name: "Basketball",
    price: 2800,
    quantity: 1,
    category: "Toys",
    sku: "BASKB147",
    description: "lorem ipsum...",
    imageUrl: "https://example.com/product.jpg",
    productUrl: "https://store.example.com/product4562"   
  }
}

// < Order Objects

export { createConnectionObj, createContactObj, getFirstName, getLasttName, createEcomOrder, createEcomCusObj }
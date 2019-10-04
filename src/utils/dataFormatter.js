// Creates connection object
function createConnectionObj(sitename, linkUrl) {
  return {
    connection: {
      service: `Zygote Cart`,
      externalid: sitename,
      name: sitename,
      logoUrl: `https://escaladesports.github.io/zygote-cart/images/logo.png`, // TODO: logourl update
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
      acceptsMarketing // TODO: update to allow the opt in on form
    }
  }
}

function getFirstName(fullName) {
  if (fullName.indexOf(` `) > 0) return fullName.split(` `)[0]
  return ` `
}

function getLastName(fullName) {
  if (fullName.indexOf(` `) > 0) return fullName.split(` `)[fullName.split(` `).length - 1]
  return ` `
}

const buildFiltersString = filters => {
  return `?${filters.map(({ filter, value }) => `&filters[${filter}]=${value}`).join('').substr(1)}`
}

// > Order Objects

async function createEcomOrder(data, connectionid, customerid) {
  // TODO: Review order creation object
  // Update all default values and review IDs
  let order = {
    ecomOrder: {
      externalid: `3246315233`,
      source: `1`, // The order source code (0 - will not trigger automations, 1 - will trigger automations)
      email: data.infoEmail,
      orderUrl: ``,
      externalCreatedDate: `2019-09-30T17:41:39-04:00`,
      externalUpdatedDate: `2019-09-30T17:41:39-04:00`,
      shippingMethod: `UPS Ground`,
      totalPrice: data.totals.subtotal,
      shippingAmount: 0,
      taxAmount: 0,
      discountAmount: 0,
      currency: `USD`,
      orderNumber: `${data.totals.subtotal}-${customerid}-${connectionid}`,
      connectionid,
      customerid
    }
  }

  // add each product to order
  order.ecomOrder.orderProducts = data.products.map(product => {
    return {
      externalid: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: ``,
      sku: ``,
      description: product.description,
      imageUrl: product.image,
      productUrl: ``
    }
  })

  return order
}

function addCartAbandoned(order, customerid, connectionid) {
  // TODO: Review the id and date
  // Add externalcheckoutid and abandoned_date to make cart abandonded
  order.externalcheckoutid = `${order.totalPrice}-${customerid}-${connectionid}`
  order.abandoned_date = `2019-09-30T17:41:39-04:00`

  return order
}

function removeCartAbandonment(order, orderid) {
  // remove order 
  delete order.externalcheckoutid
  delete order.abandoned_date

  order.externalid = `2019-09-30T17:41:39-04:00`

  return order
}


// < Order Objects

export { createConnectionObj, createContactObj, getFirstName, getLastName, buildFiltersString, createEcomOrder, createEcomCusObj, addCartAbandoned, removeCartAbandonment }

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

const getContactProps = (info = {}) => { 
  return {
    email: info.infoEmail,
    firstName: getFirstName(info.infoName),
    lastName: getLastName(info.infoName),
    phone: info.infoPhone
  }
}

const getCustomerProps = (info = {}, connection = {}, acceptsMarketing) => {
  return {
    connectionid: connection.id,
    externalid: info.infoEmail,
    email: info.infoEmail,
    acceptsMarketing: acceptsMarketing
  }
}

const getOrderProps = (info = {}, connection = {}, customer = {}) => {
  return {
    connectionid: connection.id,
    email: info.infoEmail,
    totalPrice: info.totals.subtotal,
    orderNumber: `${info.totals.subtotal}-${customer.id}-${connection.id}`,
    customerid: customer.id,
    orderProducts: info.products
  }
}

export {
  getFirstName,
  getLastName,
  buildFiltersString,
  getContactProps,
  getCustomerProps,
  getOrderProps
}
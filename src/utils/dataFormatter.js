module.exports = {

  getFirstName: (fullName = '') => {
    return fullName.indexOf(` `) > 0
      ? fullName.split(` `)[0]
      : ''
  },

  getLastName: (fullName = '') => {
    return fullName.indexOf(` `) > 0
      ? fullName.split(` `)[1]
      : ''
  },

  buildFiltersString: function (filters) {
    return `?${filters.map(({ filter, value }) => `&filters[${filter}]=${value}`).join('').substr(1)}`
  },

  getContactProps: (info = {}) => {
    const { infoEmail, infoName, infoFirstName, infoLastName, infoPhone } = info
    return {
      email: infoEmail,
      firstName: (typeof infoFirstName === `undefined`) ? module.exports.getFirstName(infoName) : infoFirstName,
      lastName: (typeof infoLastName === `undefined`) ? module.exports.getLastName(infoName) : infoLastName,
      phone: infoPhone
    }
  },

  getTagProps: (tag, tagType = ``, description) => {
    return {
      tag,
      tagType,
      description
    }
  },

  getContactTagProps: (contact = {}, tag = {}) => {
    return {
      contact: contact.id,
      tag: tag.id
    }
  },

  getCustomerProps: (info = {}, connection = {}, acceptsMarketing) => {
    const { infoEmail } = info
    return {
      connectionid: connection.id,
      externalid: infoEmail,
      email: infoEmail,
      acceptsMarketing
    }
  },

  getOrderProps: (info = {}, connection = {}, customer = {}) => {
    const { infoEmail, totals, products = [] } = info
    return {
      connectionid: connection.id,
      email: infoEmail,
      totalPrice: totals.subtotal,
      orderNumber: `${Date.now()}-${customer.id}-${connection.id}`,
      customerid: customer.id,
      orderProducts: products
    }
  }
}
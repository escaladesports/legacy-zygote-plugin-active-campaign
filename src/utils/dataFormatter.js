
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

export {
  getFirstName,
  getLastName,
  buildFiltersString
}
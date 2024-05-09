const API_URL = 'https://web-app.click/pc-shop/api/v0/'

const API_URL_PRODUCTS = API_URL + 'products/'
const API_URL_COURSE =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

// const API_SIMILAR_PRODUCTS = API_URL + `products/${id}/similar/`

const api = {
  async loadProducts() {
    const resp = await fetch(`${API_URL_PRODUCTS}`)
    const json = await resp.json()
    return json.payload
  },

  async loadProduct(id) {
    const resp = await fetch(`${API_URL_PRODUCTS + id}`)
    const json = await resp.json()
    return json.payload
  },

  async loadSimilarProducts(id) {
    let ID = `${id}`
    const resp = await fetch(`${API_URL_PRODUCTS + ID + '/similar/'}`)
    return (await resp.json()).payload
  },

  async loadCourse() {
    const resp = await fetch(`${API_URL_COURSE}`)
    const json = await resp.json()
    const currency = json.find(o => o.cc === 'USD').rate
    return currency
  },
}

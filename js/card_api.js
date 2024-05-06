const API_URL_PRODUCT = `https://web-app.click/pc-shop/api/v0/products/`

// const API_SIMULAR_PRODUCTS = `https://web-app.click/pc-shop/api/v0/products/${id}/similar/`

const API_URL_COURSE_PRODUCT =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

const card_api = {
  async loadProduct(id) {
    let ID = `${id}`
    const resp = await fetch(`${API_URL_PRODUCT + ID}`)

    return (await resp.json()).payload
  },

  async loadCourse() {
    const resp = await fetch(`${API_URL_COURSE_PRODUCT}`)
    return await resp.json()
  },

  async loadSimilarProducts(id) {
    let ID = `${id}`
    const resp = await fetch(`${API_URL_PRODUCT + ID + '/similar/'}`)

    return (await resp.json()).payload
  },
}

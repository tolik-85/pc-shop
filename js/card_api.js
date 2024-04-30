const API_URL_PRODUCT = `https://web-app.click/pc-shop/api/v0/products/`

const API_URL_COURSE =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

const card_api = {
  async loadProduct(id) {
    let ID = `${id}`
    const resp = await fetch(`${API_URL_PRODUCT + ID}`)

    return (await resp.json()).payload
  },
  async loadCourse() {
    const resp = await fetch(`${API_URL_COURSE}`)
    return await resp.json()
  },
}

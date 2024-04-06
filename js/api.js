const API_URL = 'http://35.225.111.193:8181/api/v3/products/computers'

const api = {
  async loadProducts() {
    const resp = await fetch(`${API_URL}`)
    return await resp.json()
  },
}

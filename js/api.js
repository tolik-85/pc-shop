const API_URL = 'http://35.225.111.193:8181/api/v3/products/computers'

const API_URL_COURSE =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
// const API_URL_COURSE =
//   'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'

const api = {
  async loadProducts() {
    const resp = await fetch(`${API_URL}`)
    return await resp.json()
  },

  async loadCourse() {
    const resp = await fetch(
      `${API_URL_COURSE}`
      // {
      //   mode: 'no-cors',
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //   },
      // }
    )
      .then(data => data.json)
      .then(ans => console.log(ans))

    // return await resp.json()
  },
}

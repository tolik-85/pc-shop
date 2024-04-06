const model = {
  products: [],
  filtratedProducts: [],
  filter: {},
  checkedParams: [
    'Накопитель SSD__brand__Kingston',
    'Накопитель SSD__brand__GoodRAM',
  ],

  setProducts(products) {
    this.products = products
  },

  getProducts() {
    return this.products
  },

  getFilter() {
    return this.filter
  },

  async updateProducts() {
    const products = await api.loadProducts()
    this.setProducts(products)
    this.makeFilter()
    this.filtrateProducts()
  },

  filtrateProducts() {
    console.log('hi')
    this.filtrateProducts = this.products.slice(0, 1).filter(item => {
      for (key in item.specs) {
        for (key2 in item.specs[key]) {
          console.log(`${key}__${key2}__${item.specs[key][key2]}`)
        }
      }
    })
  },

  makeFilter() {
    this.products.forEach(item => {
      for (key in item.specs) {
        if (!this.filter[key]) {
          this.filter[key] = {}
        }
        for (key2 in item.specs[key]) {
          if (!this.filter[key][key2]) {
            this.filter[key][key2] = []
          }
          for (key3 of item.specs[key][key2]) {
            if (!this.filter[key][key2].includes(item.specs[key][key2])) {
              this.filter[key][key2].push(item.specs[key][key2])
            }
          }
        }
      }
    })
  },
}

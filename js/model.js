const model = {
  UsdCourse: {
    rate: '',
  },
  products: [],
  filtratedProducts: [],
  filter: {},
  checkedParams: [
    'Накопитель SSD__brand__Kingston',
    'Накопитель SSD__brand__GoodRAM',
  ],
  checkedCheckBoxes: [],

  setProducts(products) {
    this.products = products
  },

  getProducts() {
    return this.products
  },

  getFiltratedProducts() {
    return this.filtratedProducts
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
  async updateCourse() {
    const course = await api.loadCourse()
    this.setUsdCouse(course)
  },
  setUsdCouse(course) {
    course.forEach(item => {
      for (key in item) {
        if (item[key] === 840) {
          this.UsdCourse.rate = item.rate
        }
      }
    })
  },

  filtrateProducts(i = 5) {
    this.filtratedProducts = this.products.slice(0, i)
    // console.log('hi')
    // .filter(item => {
    //   for (key in item.specs) {
    //     for (key2 in item.specs[key]) {
    //       // console.log(`${key}__${key2}__${item.specs[key][key2]}`)
    //     }
    //   }
    // })
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
              if (item.specs[key][key2].includes('???')) {
                item.specs[key][key2] = item.specs[key][key2].replace('???', '')
              }
              this.filter[key][key2].push(item.specs[key][key2])
            }
          }
        }
      }
    })
  },
}

const model = {
  UsdCourse: {
    rate: '',
  },
  products: [],
  filtratedProducts: [],
  filter: {},
  checkedFilters: [],

  addCheckedCheckboxes(checkedFilter) {
    console.log(checkedFilter)
    this.checkedFilters.push(checkedFilter)
  },

  removeCheckedCheckboxes(checkedFilter) {
    const index = this.checkedFilters.indexOf(checkedFilter)
    this.checkedFilters.splice(index, 1)
  },

  setProducts(products) {
    this.products = products
  },
  getProductsNames() {
    const products = this.getProducts()
    const productsNames = []
    products.forEach(product => {
      productsNames.push(product.caption)
    })
    return productsNames
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
  getMaxPriceUAH() {
    const productsPrices = []
    this.products.forEach(product => {
      productsPrices.push(product.price)
    })
    let maxPriceUsd = Math.max.apply(null, productsPrices)
    return (maxPriceUsd * model.UsdCourse.rate).toFixed()
  },
  getMinPriceUAH() {
    const productsPrices = []
    this.products.forEach(product => {
      productsPrices.push(product.price)
    })
    let maxPriceUsd = Math.min.apply(null, productsPrices)

    return (maxPriceUsd * model.UsdCourse.rate).toFixed()
  },
  getPriceFilterFrom() {
    const priceFrom = document.querySelector('#priceFrom')
    return priceFrom.value
  },
  getPriceFilterTo() {
    const priceTo = document.querySelector('#priceTo')
    return priceTo.value
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
  filtrateProductsByPrice() {
    this.filtratedProducts = this.products.filter(product => {
      const priceFrom = this.getPriceFilterFrom()
      const priceTo = this.getPriceFilterTo()
      const price = (product.price * model.UsdCourse.rate).toFixed()

      if (priceFrom > price && priceTo > price) {
        return product
      }
    })
  },
  filtrateProducts(i = 5) {
    this.filtratedProducts = this.products.filter(product => {
      let count = 0

      this.checkedFilters.forEach(cf => {
        let param = cf.split('_')
        if (product.attributes[param[0]] === param[1]) {
          count += 1
        }
      })

      return this.checkedFilters.length === count
    })
  },

  makeFilter() {
    this.products.forEach(item => {
      for (key in item.attributes) {
        if (!this.filter[key]) {
          model.filter[key] = []
        }
        for (key2 in item.attributes[key]) {
          if (!this.filter[key].includes(item.attributes[key]))
            this.filter[key].push(item.attributes[key])
        }
      }
    })
  },
}

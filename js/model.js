const model = {
  usdCourse: {
    rate: '',
  },
  products: [],
  // filtratedStartArr: [],
  searchedProducts: [],
  filtratedProducts: [],
  pricedProducts: [],
  sortedProducts: [],
  paginatedProducts: [],
  filter: {},
  searchedFilter: {},
  // pricedFilter: {},
  checkedFilters: [],
  searchQuery: '',

  equalizeAllProductArr() {
    this.searchedProducts = this.products
    // this.filtratedStartArr = this.products
    // this.searchedProducts = this.filtratedStartArr
    // this.filtratedProducts = this.searchedProducts
    // this.pricedProducts = this.filtratedProducts
    // this.paginatedProducts = this.pricedProducts
  },
  addCheckedCheckboxes(checkedFilter) {
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
  getFiltratedStartArr() {
    return this.filtratedStartArr
  },
  getFiltratedProducts() {
    return this.filtratedProducts
  },
  getSearchedProducts() {
    return this.searchedProducts
  },
  getPricedProducts() {
    return this.pricedProducts
  },

  getFilter() {
    return this.filter
  },
  getSearchedFilter() {
    return this.searchedFilter
  },
  getPricedFilter() {
    return this.pricedFilter
  },

  getMaxPriceUAH() {
    const productsPrices = []
    this.products.forEach(product => {
      productsPrices.push(product.price)
    })
    let maxPriceUsd = Math.max.apply(null, productsPrices)
    // return maxPriceUsd
    return (maxPriceUsd * model.usdCourse.rate).toFixed()
  },

  getMinPriceUAH() {
    const productsPrices = []
    this.products.forEach(product => {
      productsPrices.push(product.price)
    })
    let maxPriceUsd = Math.min.apply(null, productsPrices)

    // return maxPriceUsd
    return (maxPriceUsd * model.usdCourse.rate).toFixed()
  },

  getMaxPriceSearchedProductsUAH() {
    const productsPrices = []
    this.searchedProducts.forEach(product => {
      productsPrices.push(product.price)
    })
    let maxPriceUsd = Math.max.apply(null, productsPrices)
    // return maxPriceUsd
    return (maxPriceUsd * model.usdCourse.rate).toFixed()
  },

  getMinPriceSearchedProductsUAH() {
    const productsPrices = []
    this.searchedProducts.forEach(product => {
      productsPrices.push(product.price)
    })
    let maxPriceUsd = Math.min.apply(null, productsPrices)

    // return maxPriceUsd
    return (maxPriceUsd * model.usdCourse.rate).toFixed()
  },

  // getPriceFilterFrom() {
  //   const priceFrom = document.querySelector('#priceFrom')
  //   return priceFrom.value
  // },

  // getPriceFilterTo() {
  //   const priceTo = document.querySelector('#priceTo')
  //   return priceTo.value
  // },

  async updateProducts() {
    const products = await api.loadProducts()
    await model.updateCourse()
    this.setProducts(products)
    model.searchProducts('')
    model.filtrateProducts()
    model.filtrateProductsByPrice(0, 20000000)
    model.sortedProducts = model.pricedProducts
    model.pagination(0)
    console.log('searchedProducts', this.searchedProducts.length)
    console.log('filtratedProducts', this.filtratedProducts.length)
    console.log('pricedProducts', this.pricedProducts.length)
    console.log('sortedProducts', this.sortedProducts.length)
    console.log('paginatedProducts', this.paginatedProducts.length)
  },

  async updateCourse() {
    const course = await api.loadCourse()
    this.setUsdCouse(course)
    // this.searchProducts('')
    // this.filtrateProducts()
  },

  setUsdCouse(course) {
    course.forEach(item => {
      for (key in item) {
        if (item[key] === 840) {
          this.usdCourse.rate = item.rate
        }
      }
    })
  },

  searchProducts() {
    this.searchedProducts = this.products.filter(product => {
      const productName = product.caption.toLowerCase()
      this.searchQuery = this.searchQuery.toLowerCase()
      if (productName.includes(this.searchQuery)) {
        return true
      }
    })
  },

  pagination(pageNum) {
    this.paginatedProducts = this.sortedProducts

    let numPerPage = 7
    let startIdx = pageNum * numPerPage
    let endIdx = startIdx + numPerPage

    this.paginatedProducts = this.paginatedProducts.slice(startIdx, endIdx)
    return this.paginatedProducts
  },

  filtrateProductsByPrice(priceFrom, priceTo) {
    const course = model.usdCourse.rate
    priceFrom = (priceFrom / course).toFixed()
    priceTo = (priceTo / course).toFixed()
    this.pricedProducts = this.filtratedProducts.filter(product => {
      const price = product.price
      if (priceFrom <= price && price <= priceTo) {
        return true
      }
    })
  },

  filtrateProducts() {
    // let filtratedArr = this.products
    // if (this.searchedProducts.length > 0) {
    //   filtratedArr = this.searchedProducts
    // }
    this.filtratedProducts = this.searchedProducts.filter(product => {
      let count = 0

      this.checkedFilters.forEach(cf => {
        let param = cf.split('_')
        // console.log(param)
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

  makeFilterForSeachProducts() {
    this.searchedProducts.forEach(item => {
      for (key in item.attributes) {
        if (!this.searchedFilter[key]) {
          model.searchedFilter[key] = []
        }
        for (key2 in item.attributes[key]) {
          if (!this.searchedFilter[key].includes(item.attributes[key]))
            this.searchedFilter[key].push(item.attributes[key])
        }
      }
    })
  },
  makeFilterForFiltratedStartArr() {
    this.filtratedStartArr.forEach(item => {
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

  sortProducts(elSelectValue) {
    if (elSelectValue === 'От А до Я') {
      console.log('От А до Я')
      this.paginatedProducts.sort((a, b) => {
        if (a.caption < b.caption) {
          return -1
        }
        if (a.caption > b.caption) {
          return 1
        }
        return 0
      })
    }
    if (elSelectValue === 'От Я до А') {
      console.log('От Я до А')
      this.paginatedProducts.sort((a, b) => {
        if (a.caption < b.caption) {
          return 1
        }
        if (a.caption > b.caption) {
          return -1
        }
        return 0
      })
    }
    if (elSelectValue === 'Цена по возростанию') {
      console.log('Цена по возростанию')
      this.paginatedProducts.sort((a, b) => a.price - b.price)
    }
    if (elSelectValue === 'Цена по убыванию') {
      console.log('Цена по убыванию')
      this.paginatedProducts.sort((a, b) => b.price - a.price)
    }
  },
  log() {
    console.log('products ', model.products.lenght)
    console.log('searchedProducts', model.searchedProducts.lenght)
    console.log('pricedProducts', model.pricedProducts.lenght)
    console.log('sortedProducts', model.sortedProducts.lenght)
    console.log('paginatedProducts', model.paginatedProducts.lenght)
  },
}

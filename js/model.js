const model = {
  UsdCourse: {
    rate: '',
  },
  products: [],
  filtratedStartArr: [],
  searchedProducts: [],
  filtratedProducts: [],
  pricedProducts: [],
  paginatedProducts: [],
  filter: {},
  // searchedFilter: {},
  // pricedFilter: {},
  checkedFilters: [],

  equalizeAllProductArr() {
    this.filtratedStartArr = this.products
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
    return (maxPriceUsd * model.UsdCourse.rate).toFixed()
  },

  getMinPriceUAH() {
    const productsPrices = []
    this.products.forEach(product => {
      productsPrices.push(product.price)
    })
    let maxPriceUsd = Math.min.apply(null, productsPrices)

    // return maxPriceUsd
    return (maxPriceUsd * model.UsdCourse.rate).toFixed()
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
    model.equalizeAllProductArr()
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
          this.UsdCourse.rate = item.rate
        }
      }
    })
  },

  searchProducts(query) {
    this.filtratedStartArr = this.filtratedStartArr.filter(product => {
      const productName = product.caption.toLowerCase()
      query = query.toLowerCase()
      if (productName.includes(query)) {
        return true
      }
    })
  },

  pagination(pageNum) {
    this.paginatedProducts = this.filtratedStartArr

    let numPerPage = 7
    let startIdx = pageNum * numPerPage
    let endIdx = startIdx + numPerPage

    this.paginatedProducts = this.paginatedProducts.slice(startIdx, endIdx)
    return this.paginatedProducts
  },

  filtrateProductsByPrice(priceFrom, priceTo) {
    // let filtratedArr = this.filtratedProducts
    // if (this.searchedProducts.length > 0) {
    //   filtratedArr = this.searchedProducts
    // }
    const course = model.UsdCourse.rate
    priceFrom = (priceFrom / course).toFixed()
    priceTo = (priceTo / course).toFixed()
    this.filtratedStartArr = this.filtratedStartArr.filter(product => {
      // let priceFrom = this.getPriceFilterFrom()
      // let priceTo = this.getPriceFilterTo()

      // console.log('priceFrom', priceFrom)
      // console.log('priceTo', priceTo)

      const price = product.price

      // console.log('course', model.UsdCourse.rate)
      // console.log('priceFrom', priceFrom)
      // console.log('priceTo', priceTo)
      // console.log('price', price)

      if (priceFrom <= price && price <= priceTo) {
        return true
      }
      // return priceFrom <= price && price <= priceTo
    })
  },

  filtrateProducts() {
    // let filtratedArr = this.products
    // if (this.searchedProducts.length > 0) {
    //   filtratedArr = this.searchedProducts
    // }
    this.filtratedStartArr = this.filtratedStartArr.filter(product => {
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
}
// console.log(model.filtratedProducts)
// console.log(model.products)

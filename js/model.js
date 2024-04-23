const model = {
  UsdCourse: {
    rate: '',
  },
  products: [],
  searchedProducts: [],
  filtratedProducts: [],
  pricedProducts: [],
  paginatedProducts: [],
  filter: {},
  searchedFilter: {},
  pricedFilter: {},
  checkedFilters: [],

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

  filtrateProductsBySearch(searchedData) {
    this.searchedProducts = this.filtratedProducts
    this.searchedProducts = this.searchedProducts.filter(product => {
      const productName = product.caption.toLowerCase()
      searchedData = searchedData.toLowerCase()
      if (productName.includes(searchedData)) {
        return true
      }
    })
  },

  pagination(pageNum) {
    this.paginatedProducts = this.filtratedProducts

    if (this.searchedProducts.length > 0 && this.pricedProducts.length === 0) {
      paginatedProducts = this.searchedProducts
    }
    if (this.pricedProducts.length > 0 && this.searchedProducts.length === 0) {
      this.paginatedProducts = this.pricedProducts
    }
    if (this.pricedProducts.length > 0 && this.searchedProducts.length > 0) {
      if (this.pricedProducts.length > this.searchedProducts.length) {
        this.paginatedProducts = this.searchedProducts
      } else {
        this.paginatedProducts = pricedProducts
      }
    }

    let numPerPage = 7
    let startIdx = pageNum * numPerPage
    let endIdx = startIdx + numPerPage

    this.paginatedProducts = this.paginatedProducts.slice(startIdx, endIdx)
    return this.paginatedProducts
  },

  filtrateProductsByPrice() {
    let filtratedArr = this.filtratedProducts
    if (this.searchedProducts.length > 0) {
      filtratedArr = this.searchedProducts
    }
    this.pricedProducts = filtratedArr.filter(product => {
      let priceFrom = this.getPriceFilterFrom()
      let priceTo = this.getPriceFilterTo()
      const course = model.UsdCourse.rate
      priceFrom = (priceFrom / course).toFixed()
      priceTo = (priceTo / course).toFixed()
      const price = product.price

      if (priceFrom <= price && price <= priceTo) {
        return true
      }
      // return priceFrom <= price && price <= priceTo
    })
  },

  filtrateProducts(i = 5) {
    let filtratedArr = this.products
    if (this.searchedProducts.length > 0) {
      filtratedArr = this.searchedProducts
    }
    this.filtratedProducts = filtratedArr.filter(product => {
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
  makeFilterForPricedProducts() {
    this.pricedProducts.forEach(item => {
      for (key in item.attributes) {
        if (!this.pricedFilter[key]) {
          model.pricedFilter[key] = []
        }
        for (key2 in item.attributes[key]) {
          if (!this.pricedFilter[key].includes(item.attributes[key]))
            this.pricedFilter[key].push(item.attributes[key])
        }
      }
    })
  },

  sortProducts(elSelectValue) {
    if (elSelectValue === 'От А до Я') {
      console.log('От А до Я')
      this.filtratedProducts.sort((a, b) => {
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
      this.filtratedProducts.sort((a, b) => {
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
      this.filtratedProducts.sort((a, b) => a.price - b.price)
    }
    if (elSelectValue === 'Цена по убыванию') {
      console.log('Цена по убыванию')
      this.filtratedProducts.sort((a, b) => b.price - a.price)
    }
  },
}
// console.log(model.filtratedProducts)
// console.log(model.products)

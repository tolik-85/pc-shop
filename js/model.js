const model = {
  usdCourse: 0,
  products: [],
  searchedProducts: [],
  filtratedProducts: [],
  pricedProducts: [],
  sortedProducts: [],
  paginatedProducts: [],
  filter: {},
  checkedFilters: [],
  searchQuery: '',
  sortingType: 'Цена по возростанию',
  cardProduct: {},
  similarProductsIdList: [],
  similarProducts: [],
  productsOnPage: 10,
  productsTotal: 0,
  pagesCount: 0,
  curPage: 0,
  minPrice: 0,
  maxPrice: 0,
  priceFrom: 0,
  priceTo: 0,

  vortex() {
    this.searchProducts(this.searchQuery)
    this.makeFilter()
    this.filtrateProducts(this.checkedFilters)
    this.getMinPriceUAH()
    this.getMaxPriceUAH()
  },

  async updateProducts() {
    const products = await api.loadProducts()
    this.setProducts(products)

    this.vortex()

    this.filtrateProductsByPrice(0, 20000000)
    this.sortProducts(this.sortingType)
    this.pagination(0)
  },

  searchProducts(searchQuery) {
    if (searchQuery) {
      this.searchQuery = searchQuery
    }
    this.searchedProducts = this.products.filter(product => {
      const productName = product.caption.toLowerCase()
      this.searchQuery = this.searchQuery.toLowerCase()
      if (productName.includes(this.searchQuery)) {
        return true
      }
    })
  },

  filtrateProducts(checkedFilters) {
    if (checkedFilters) {
      this.checkedFilters = checkedFilters
    }
    this.filtratedProducts = this.searchedProducts.filter(product => {
      let count = 0
      this.checkedFilters.forEach(cf => {
        let param = cf.split('_')
        if (product.attributes[param[0]] === param[1]) {
          count += 1
        }
      })
      const attrsType = [
        ...new Set(this.checkedFilters.map(item => item.split('_')[0])),
      ]
      return attrsType.length === count
    })
  },

  filtrateProductsByPrice(priceFrom, priceTo) {
    const course = this.usdCourse
    priceFrom = +(priceFrom / course).toFixed()
    priceTo = +(priceTo / course).toFixed()
    this.pricedProducts = this.filtratedProducts.filter(product => {
      const price = product.price
      if (priceFrom <= price && price <= priceTo) {
        return true
      }
    })
  },

  sortProducts(sortingType) {
    if (sortingType) {
      this.sortingType = sortingType
    }
    if (this.sortingType === 'От А до Я') {
      this.sortedProducts = this.pricedProducts.toSorted((a, b) => {
        if (a.caption < b.caption) {
          return -1
        }
        if (a.caption > b.caption) {
          return 1
        }
        return 0
      })
    }
    if (this.sortingType === 'От Я до А') {
      this.sortedProducts = this.pricedProducts.toSorted((a, b) => {
        if (a.caption < b.caption) {
          return 1
        }
        if (a.caption > b.caption) {
          return -1
        }
        return 0
      })
    }
    if (this.sortingType === 'Цена по возростанию') {
      this.sortedProducts = this.pricedProducts.toSorted(
        (a, b) => a.price - b.price
      )
    }
    if (this.sortingType === 'Цена по убыванию') {
      this.sortedProducts = this.pricedProducts.toSorted(
        (a, b) => b.price - a.price
      )
    }
  },

  pagination(pageNum) {
    let startIdx = pageNum * this.productsOnPage
    let endIdx = +startIdx + +this.productsOnPage
    this.paginatedProducts = this.sortedProducts.slice(startIdx, endIdx)
  },

  makeFilter() {
    this.filter = {}
    this.searchedProducts.forEach(item => {
      for (key in item.attributes) {
        if (!this.filter[key]) {
          this.filter[key] = []
        }
        for (key2 in item.attributes[key]) {
          if (!this.filter[key].includes(item.attributes[key]))
            this.filter[key].push(item.attributes[key])
        }
      }
    })
  },

  async updateProduct(id) {
    const cardProduct = await api.loadProduct(id)
    this.setProduct(cardProduct)
  },

  addCheckedCheckboxes(checkedFilter) {
    this.checkedFilters.push(checkedFilter)
  },

  removeCheckedCheckboxes(checkedFilter) {
    const index = this.checkedFilters.indexOf(checkedFilter)
    this.checkedFilters.splice(index, 1)
  },

  async updateCourse() {
    const course = await api.loadCourse()
    this.setUsdCouse(course)
  },

  async updateSimilarProductsIdList(id) {
    this.similarProductsIdList = await api.loadSimilarProducts(id)
  },

  async updateSimilarProducts() {
    const promises = this.similarProductsIdList.map(async prod => {
      let similarProduct = await api.loadProduct(prod.relatedProductId)
      this.similarProducts.push(similarProduct)
    })
    await Promise.all(promises)
  },

  getProductsNames() {
    return this.products.map(product => product.caption)
  },
  getProducts() {
    return this.products
  },
  getSearchedProducts() {
    return this.searchedProducts
  },
  getFiltratedProducts() {
    return this.filtratedProducts
  },
  getPricedProducts() {
    return this.pricedProducts
  },
  getFilter() {
    return this.filter
  },
  getPricedFilter() {
    return this.pricedFilter
  },
  getProductPrices() {
    return this.filtratedProducts.map(product => product.price)
  },
  getMinPriceUAH() {
    const minPriceUsd = Math.min(...this.getProductPrices())
    const minPriceUah = minPriceUsd * this.usdCourse
    const minPrice = isFinite(minPriceUah) ? +minPriceUah.toFixed() : 0
    this.minPrice = minPrice
    return minPrice
  },
  getMaxPriceUAH() {
    const maxPriceUsd = Math.max(...this.getProductPrices())
    const maxPriceUah = maxPriceUsd * this.usdCourse
    const maxPrice = isFinite(maxPriceUah) ? +maxPriceUah.toFixed() : 0
    this.maxPrice = maxPrice
    return maxPrice
  },
  setUsdCouse(course) {
    this.usdCourse = course
  },
  setProducts(products) {
    this.products = products
  },
  getProduct() {
    return this.cardProduct
  },
  setProduct(cardProduct) {
    this.cardProduct = cardProduct
  },
  getSimilarProducts() {
    return this.similarProducts
  },
  setProductsOnPage(n) {
    this.productsOnPage = n
  },
  setSearchQuery(query) {
    this.searchQuery = query
  },
}

const model = {
  usdCourse: 0,

  similarProductsIdList: [],
  similarProducts: [],
  cardProduct: {},

  products: [],
  searchedProducts: [],
  filtratedProducts: [],
  pricedProducts: [],
  sortedProducts: [],
  paginatedProducts: [],

  searchQuery: '',
  checkedFilters: [],
  priceFrom: 0,
  priceTo: Infinity,
  sortingType: 'Цена по возростанию',
  curPage: 0,
  productsOnPage: 10,
  favorites: ['19', '22', '21', '50', '32', '45'],
  compare: ['19', '22', '21', '50', '32', '45'],
  cart: ['14', '13', '15', '16', '17', '18'],

  compareProducts: [],
  cartProducts: [],
  favoritesProducts: [],

  filter: {},
  minPrice: 0,
  maxPrice: 0,
  productsTotal: 0,
  pagesCount: 0,

  makeCompareProductsArr() {
    this.products.forEach(product => {
      this.compare.forEach(id => {
        if (product.id === +id) {
          this.compareProducts.push(product)
        }
      })
    })
  },

  makeCartProductsArr() {
    this.products.forEach(product => {
      this.cart.forEach(id => {
        if (product.id === +id) {
          this.cartProducts.push(product)
        }
      })
    })
  },

  makefavoritesProductsArr() {
    this.products.forEach(product => {
      this.favorites.forEach(id => {
        if (product.id === +id) {
          this.favoritesProducts.push(product)
        }
      })
    })
  },

  getCartProductsSummPriceUAH() {
    let summ = 0
    this.cartProducts.forEach(product => {
      summ = summ + product.priceUAH
    })
    return summ
  },

  vortex() {
    this.searchProducts(this.searchQuery)
    this.filtrateProducts(this.checkedFilters)
    this.calcMinPriceUAH()
    this.calcMaxPriceUAH()
    this.filtrateProductsByPrice(this.priceFrom, this.priceTo)
    console.log('this.minPrice :>> ', this.minPrice)
    console.log('this.maxPrice :>> ', this.maxPrice)
    console.log('this.priceFrom :>> ', this.priceFrom)
    console.log('this.priceTo :>> ', this.priceTo)
    this.sortProducts(this.sortingType)
    this.paginateProducts(this.curPage)
    this.makeFilter()
  },

  searchProducts(searchQuery) {
    if (searchQuery) {
      this.searchQuery = searchQuery
    }
    this.searchedProducts = this.products.filter(product => {
      const productCaption = product.caption.toLowerCase()
      this.searchQuery = this.searchQuery.toLowerCase()
      if (productCaption.includes(this.searchQuery)) {
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
    if (priceFrom !== undefined && priceTo !== undefined) {
      this.priceFrom = priceFrom
      this.priceTo = priceTo
    }
    this.pricedProducts = this.filtratedProducts.filter(
      p => this.priceFrom <= p.priceUAH && p.priceUAH <= this.priceTo
    )
  },

  sortProducts(sortingType) {
    if (sortingType) {
      this.sortingType = sortingType
    }
    if (this.sortingType === 'От А до Я') {
      this.sortedProducts = this.pricedProducts.toSorted()
    }
    if (this.sortingType === 'От Я до А') {
      this.sortedProducts = this.pricedProducts.toSorted().toReversed()
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

  paginateProducts(curPage) {
    if (curPage >= 0) {
      this.curPage = curPage
    }
    let startIdx = this.curPage * this.productsOnPage
    let endIdx = startIdx + this.productsOnPage
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
    return this.filter
  },

  addAllCheckedCheckboxes(checkedIds) {
    this.checkedFilters = checkedIds
  },

  removeAllCheckedCheckboxes(checkedFilter) {
    this.checkedFilters = []
  },

  addUAHPriceToProducts() {
    this.products.forEach(
      product => (product.priceUAH = product.price * this.usdCourse)
    )
  },

  async updateProductsAndUsdCourse() {
    await Promise.all([this.updateUsdCourse(), this.updateProducts()])
    this.addUAHPriceToProducts()
  },

  async updateProducts() {
    const products = await api.loadProducts()
    this.setProducts(products)
  },

  async updateProduct(id) {
    const cardProduct = await api.loadProduct(id)
    this.setProduct(cardProduct)
  },

  async updateUsdCourse() {
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

  getProductsCaptions() {
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
  getPricedFilter() {
    return this.pricedFilter
  },
  getProductPrices() {
    return this.filtratedProducts.map(product => product.price)
  },
  calcMinPriceUAH() {
    const minPriceUsd = Math.min(...this.getProductPrices())
    const minPriceUah = minPriceUsd * this.usdCourse
    const minPrice = isFinite(minPriceUah) ? +minPriceUah.toFixed() : 0
    this.minPrice = minPrice
    return minPrice
  },
  calcMaxPriceUAH() {
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
    if (query === null) {
      query = ''
    }
    this.searchQuery = query
  },
  setPriceFromTo(from, to) {
    this.priceFrom = from
    this.priceTo = to
  },
  setCurPage(curPage) {
    this.curPage = curPage
  },
  setSortingType(sortingType) {
    this.sortingType = sortingType
  },
}

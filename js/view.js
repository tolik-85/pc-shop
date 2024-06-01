const view = {
  getProductsFromSearchForm(word, product) {
    return product.filter(prod => {
      const regex = new RegExp(word, 'gi')
      return prod.match(regex)
    })
  },
  renderLeftOptions() {
    // const searchInput = document.querySelector('.search')
    const searchOptions = document.querySelector('.data')
    const productsNames = model.getProductsCaptions()
    const options = view.getProductsFromSearchForm(this.value, productsNames)

    const result = options
      .map(productName => {
        return `<option value="${productName}"></option>`
      })
      .join('')
    searchOptions.innerHTML = this.value ? result : null
  },

  async onLoadCatalog() {
    this.renderInputSearch()
    await controller.handleLoadCatalog(true)
    document.querySelector('.search-submit').click()
    this.addEventListener()

    this.addToFavoritesListener()
    this.addToCompareListener()
    this.addToCartListener()
  },

  onClickSearchSubmit() {
    const searchInput = document.querySelector('.search')
    controller.handleSearch(searchInput.value)
  },

  renderLabelPrice(from, to) {
    const elSpanRangePriceFrom = document.querySelector('.price-from')
    const elSpanRangePriceTo = document.querySelector('.price-to')
    elSpanRangePriceFrom.innerHTML = from
    elSpanRangePriceTo.innerHTML = to
  },

  onChangeInputRange(e) {
    const elPriceFromRange = document.querySelector('#priceFrom')
    const elPriceToRange = document.querySelector('#priceTo')
    view.renderLabelPrice(elPriceFromRange.value, elPriceToRange.value)
    if (+e.target.value > +elPriceToRange.value) {
      elPriceToRange.value = +e.target.value
    }
    if (+e.target.value < +elPriceFromRange.value) {
      elPriceFromRange.value = +e.target.value
    }
  },

  onFiltrateClick() {
    const priceFrom = document.querySelector('#priceFrom').value
    const priceTo = document.querySelector('#priceTo').value
    console.log('view.priceFrom', priceFrom)
    console.log('view.priceTo', priceTo)
    const elCheckboxes = document.querySelectorAll(
      '.wrap-checkboxes [type="checkbox"]:checked'
    )
    const checkedIds = Array.from(elCheckboxes).map(el => el.id)
    controller.handleFiltrate(checkedIds, priceFrom, priceTo)
  },

  onChangeSelectPerPage(e) {
    controller.handleProductsOnPage(e.target.value)
  },

  onChangeSelectSorting(e) {
    controller.handleSorting(e.target.value)
  },

  onClickPagination(e) {
    e.preventDefault()
    // let pageNum = parseInt(e.target.innerHTML.replace(/[^\d]/g, ''))
    let pageNum = parseInt(e.target.textContent)
    controller.handlePagination(pageNum)
  },

  renderInputSearch() {
    const locationParams = new URLSearchParams(location.search)
    const searchQuery = locationParams.get('search-query')
    const elInputSearch = document.querySelector('.search')
    elInputSearch.value = searchQuery
  },

  renderWrapFilter(filter) {
    const elWrapCheckboxes = document.querySelector('.wrap-checkboxes')
    elWrapCheckboxes.innerHTML = ''
    for (const key in filter) {
      if (key) {
        const elFilterCategory = generateFilterCategory(key)
        elWrapCheckboxes.appendChild(elFilterCategory)
      }
      const elFilterGroupWrappers = generateFilterGroupWrappers()
      filter[key].forEach(el => {
        const chBoxes = generateFilterWrapCheckBox(el, key)
        elFilterGroupWrappers.appendChild(chBoxes)
        elWrapCheckboxes.appendChild(elFilterGroupWrappers)
      })
    }
  },

  renderRangePrice(maxPrice, minPrice) {
    const elPriceFromRange = document.querySelector('#priceFrom')
    const elPriceToRange = document.querySelector('#priceTo')
    const elSpanRangePriceFrom = document.querySelector('.price-from')
    const elSpanRangePriceTo = document.querySelector('.price-to')

    elPriceFromRange.min = minPrice
    elPriceFromRange.max = maxPrice
    elPriceFromRange.value = minPrice
    elPriceToRange.min = minPrice
    elPriceToRange.max = maxPrice
    elPriceToRange.value = maxPrice
    elSpanRangePriceFrom.innerHTML = minPrice
    elSpanRangePriceTo.innerHTML = maxPrice
  },

  renderContainerProduct(product) {
    const elContainerProducts = document.querySelector('.container-products')
    const elProduct = generateProduct(product)
    elContainerProducts.appendChild(elProduct)
  },

  renderContainerProducts(products) {
    let elContainerProducts = document.querySelector('.container-products')
    elContainerProducts.innerHTML = ''
    products.forEach(this.renderContainerProduct)
    if (products.length === 0) {
      const elParagraph = generateParagraphFindNothing()
      elContainerProducts.appendChild(elParagraph)
    }
  },

  renderPagination(curPage, productsTotal, pagesCount) {
    window.history.pushState(null, '', `?page=${curPage}`)
    const elPaginator = document.querySelector('.paginator')
    elPaginator.innerHTML = ''
    for (let i = 0; i < pagesCount; i++) {
      let elPage = generatePaginaionPage(i)
      elPaginator.appendChild(elPage)
      if (i === curPage) {
        elPage.classList.add('bold')
      }
    }
  },

  // ===== Конец логики view каталога

  async onLoadCompare() {
    await controller.handleLoadCatalog()
    model.compareProductsObj()
    model.compareProducts.forEach(product => {
      this.renderCompareTable(product)
    })
  },

  renderCompareTable() {
    const elMainCompare = document.querySelector('.main-compare')
    model.compare.forEach(product => {
      const img = generateCompareTable(product)
      elMainCompare.appendChild(img)
    })
  },

  addToCompareListener() {
    const addToCompareBtn = document.querySelectorAll('.add-to-compare')
    addToCompareBtn.forEach(el => {
      el.addEventListener('click', this.onClickAddToCompare)
    })
  },

  addToCartListener() {
    const addToCartBtn = document.querySelectorAll('.add-to-cart')
    addToCartBtn.forEach(el => {
      el.addEventListener('click', this.onClickAddToCart)
    })
  },

  addToFavoritesListener() {
    const addToFavoritesBtn = document.querySelectorAll('.add-to-favorites')
    addToFavoritesBtn.forEach(el => {
      el.addEventListener('click', this.onClickAddToFavorites)
    })
  },

  onClickAddToCompare(e) {
    const productId =
      e.target.parentNode.parentNode.parentNode.querySelector(
        '.id>span'
      ).innerHTML
    controller.hanldeAddToCompare(productId)
  },

  onClickAddToCart(e) {
    const productId =
      e.target.parentNode.parentNode.parentNode.querySelector(
        '.id>span'
      ).innerHTML
    controller.handleAddToCart(productId)
  },

  onClickAddToFavorites(e) {
    const productId =
      e.target.parentNode.parentNode.parentNode.querySelector(
        '.id>span'
      ).innerHTML
    controller.handleAddToFavorites(productId)
  },

  renderCompareQty(qty) {
    const elCompareQty = document.querySelector('.compare-qty')
    elCompareQty.innerHTML = qty
  },

  renderCartQty(qty) {
    const elCartQty = document.querySelector('.cart-qty')
    elCartQty.innerHTML = qty
  },

  renderFavoritesQty(qty) {
    const elFavoritesQty = document.querySelector('.favorites-qty')
    elFavoritesQty.innerHTML = qty
  },

  renderCardMainOnsearch(searchedProducts) {
    searchedProducts.forEach(this.renderCardProductsOnSearch)
  },

  renderCardProductsOnSearch(product) {
    const elMain = document.querySelector('.main')
    const elProduct = generateProduct(product)
    elMain.appendChild(elProduct)
  },

  addEventListener() {
    const searchInput = document.querySelector('.search')
    const elPriceFromRange = document.querySelector('#priceFrom')
    const elPriceToRange = document.querySelector('#priceTo')
    const elSelectSorting = document.querySelector('#products-sorting')
    const elSelectPerPage = document.querySelector('#products-on-page')
    const elSearchBtn = document.querySelector('.search-submit')
    const elFiltrateBtn = document.querySelector('#filtrate')

    elFiltrateBtn.addEventListener('click', this.onFiltrateClick)
    elSearchBtn.addEventListener('click', this.onClickSearchSubmit)
    elSelectSorting.addEventListener('change', this.onChangeSelectSorting)
    searchInput.addEventListener('change', this.renderLeftOptions)
    searchInput.addEventListener('keyup', this.renderLeftOptions)
    elPriceFromRange.addEventListener('input', this.onChangeInputRange)
    elPriceToRange.addEventListener('input', this.onChangeInputRange)
    elSelectPerPage.addEventListener('change', this.onChangeSelectPerPage)
  },

  async onLoadedCard() {
    const search = new URLSearchParams(location.search)
    const id = search.get('id')
    await controller.handleUpdateProduct(id)
    await controller.handleSimilarProducts(id)
    controller.handleRenderProduct()
    controller.handleSimilarProductsSection()
  },

  renderCardMainClear() {
    let elMainCont = document.querySelector('.main')
    console.log(elMainCont)
    elMainCont.innerHTML = ''
  },

  renderMain(product) {
    const elMain = document.querySelector('main')
    const productCard = cardGenerator.generateProductCard(product)
    const section = cardGenerator.generateSectionSimilarProducts()
    elMain.appendChild(productCard)
    elMain.appendChild(section)
  },

  renderSimilarProducts(product) {
    const section = document.querySelector('.similar-products')
    const simProdWrap = document.querySelector('.similar_products-wrap')
    const semProd = cardGenerator.generateSimilarProduct(product)
    simProdWrap.appendChild(semProd)
    section.appendChild(simProdWrap)
  },
}

if (location.pathname.toLowerCase().includes('/card.html')) {
  // console.log('card')
  document.addEventListener('DOMContentLoaded', view.onLoadedCard.bind(view))
}

if (location.pathname.toLowerCase().includes('/index.html')) {
  // console.log('catalog')
  document.addEventListener('DOMContentLoaded', view.onLoadCatalog.bind(view))
}

if (location.pathname.toLowerCase().includes('/compare.html')) {
  // console.log('catalog')
  document.addEventListener('DOMContentLoaded', view.onLoadCompare.bind(view))
}

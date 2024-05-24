const view = {
  async onLoadCompare() {
    await controller.handleUpdateProducts(true)
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
    const AddToCompareBtn = document.querySelectorAll('.add-to-compare')
    AddToCompareBtn.forEach(el => {
      el.addEventListener('click', this.onClickAddToCompare)
    })
  },

  addToCartListener() {
    const AddToCartBtn = document.querySelectorAll('.add-to-cart')
    AddToCartBtn.forEach(el => {
      el.addEventListener('click', this.onClickAddToCart)
    })
  },

  addToFavoritesListener() {
    const AddToFavoritesBtn = document.querySelectorAll('.add-to-favorites')
    AddToFavoritesBtn.forEach(el => {
      el.addEventListener('click', this.onClickAddToFavorites)
    })
  },

  onClickAddToCompare(e) {
    const productId =
      e.target.parentNode.parentNode.parentNode.querySelector(
        '.id>span'
      ).innerHTML
    controller.addToCompareHandler(productId)
  },

  onClickAddToCart(e) {
    const productId =
      e.target.parentNode.parentNode.parentNode.querySelector(
        '.id>span'
      ).innerHTML
    controller.addToCartHandler(productId)
  },

  onClickAddToFavorites(e) {
    const productId =
      e.target.parentNode.parentNode.parentNode.querySelector(
        '.id>span'
      ).innerHTML
    controller.addToFavoritesHandler(productId)
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

  renderInputSearch() {
    // console.log('foobar')
    const locationParams = new URLSearchParams(location.search)
    const searchQuery = locationParams.get('search-query')
    const elInputSearch = document.querySelector('.search')
    elInputSearch.value = searchQuery
    // console.dir(document.querySelector('.search-submit'))
    // document.querySelector('.search-submit').click()
    // setTimeout(() => {
    //   document.querySelector('.search-submit').click()
    // }, 1000)
  },

  renderPagination(curPage, productsTotal, pagesCount) {
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

  onFiltrateClick() {
    const priceFrom = document.querySelector('#priceFrom').value
    const priceTo = document.querySelector('#priceTo').value
    const elCheckboxes = document.querySelectorAll(
      '.wrap-checkboxes [type="checkbox"]:checked'
    )
    const checkedIds = Array.from(elCheckboxes).map(el => el.id)

    controller.handleFiltrate(checkedIds, priceFrom, priceTo)
  },

  async onLoadCatalog() {
    this.searchFilter()
    this.renderInputSearch()
    await controller.handleUpdateProducts(true)
    document.querySelector('.search-submit').click()
    // controller.checkAndSetSearchQuery()
    controller.handleFilter()
    document.querySelector('#filtrate').onclick =
      this.onFiltrateClick.bind(this)
    this.addEventListener()
    this.renderFilterCheckboxes()
    this.renderRangeWrap()
    this.renderRangeWrap()
    this.goToProductPageClick()
    this.addToFavoritesListener()
    this.addToCompareListener()
    this.addToCartListener()
  },

  onChangeSelectProductsOnPage(e) {
    controller.handleProductsOnPage(e.target.value)
  },
  goToProductPageClick() {
    const elsProducts = document.querySelectorAll('.wrap-img>a>img')
    elsProducts.forEach(el => {
      el.addEventListener('click', this.onClickGoToProductPage)
    })
  },
  renderElWrapCheckboxClear() {
    let elWrapCheckbox = document.querySelector('.wrap-checkboxes')
    elWrapCheckbox.innerHTML = ''
  },
  searchFilter() {
    const searchBtn = document.querySelector('.search-submit')
    searchBtn.addEventListener('click', this.onClickInputSearch)
  },
  onClickGoToProductPage(e) {
    e.preventDefault
    const wrapProduct = e.target.parentNode.parentNode.parentNode
    const id = wrapProduct.querySelector('.id>span').innerHTML
    // controller.goToProductPageHandler(id)
  },
  onClickInputSearch() {
    // console.log('hello world')
    const searchInput = document.querySelector('.search')
    controller.searchHandler(searchInput.value)
  },

  onClickPagination(e) {
    let pageNum = parseInt(e.target.innerHTML.replace(/[^\d]/g, ''))
    controller.handlePagination(pageNum)
  },

  onChangeSelectSorting(e) {
    controller.handleSorting(e.target.value)
  },

  renderCardMainOnsearch(searchedProducts) {
    searchedProducts.forEach(this.renderCardProductsOnSearch)
  },
  renderCardProductsOnSearch(product) {
    const elMain = document.querySelector('.main')
    const elProduct = generateProduct(product)
    elMain.appendChild(elProduct)
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

  renderWrapFilter(filter) {
    const elWrapCheckboxes = document.querySelector('.wrap-checkboxes')
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
  renderRangeWrapOnSearch(maxPrice, minPrice) {
    const elPriceFromRange = document.querySelector('#priceFrom')
    const elPriceToRange = document.querySelector('#priceTo')
    const elSpanRangePriceFrom = document.querySelector('.price-from')
    const elSpanRangePriceTo = document.querySelector('.price-to')
    elPriceFromRange.min = minPrice
    elPriceFromRange.max = maxPrice
    elPriceFromRange.value = minPrice
    elSpanRangePriceFrom.innerHTML = minPrice

    elPriceToRange.min = minPrice
    elPriceToRange.max = maxPrice
    elPriceToRange.value = maxPrice
    elSpanRangePriceTo.innerHTML = maxPrice
  },
  renderRangeWrap() {
    const elPriceFromRange = document.querySelector('#priceFrom')
    const elPriceToRange = document.querySelector('#priceTo')
    const elSpanRangePriceFrom = document.querySelector('.price-from')
    const elSpanRangePriceTo = document.querySelector('.price-to')
    const maxPrice = model.getMaxPriceUAH()
    const minPrice = model.getMinPriceUAH()

    elPriceFromRange.min = minPrice
    elPriceFromRange.max = maxPrice
    elPriceToRange.min = minPrice
    elPriceToRange.max = maxPrice
    elPriceToRange.value = maxPrice
    elPriceFromRange.value = minPrice

    elSpanRangePriceFrom.innerHTML = elPriceFromRange.value
    elSpanRangePriceTo.innerHTML = elPriceToRange.value
  },
  onChangeInputRange(e) {
    const elPriceFromRange = document.querySelector('#priceFrom')
    const elPriceToRange = document.querySelector('#priceTo')

    const elSpanRangePriceFrom = document.querySelector('.price-from')
    const elSpanRangePriceTo = document.querySelector('.price-to')
    elSpanRangePriceFrom.innerHTML = elPriceFromRange.value
    elSpanRangePriceTo.innerHTML = elPriceToRange.value

    if (+e.target.value > +elPriceToRange.value) {
      elPriceToRange.value = +e.target.value
    }
    if (+e.target.value < +elPriceFromRange.value) {
      elPriceFromRange.value = +e.target.value
    }
  },

  onInputInputRangePriceFrom(e) {
    handleInputPriceFrom(e.target.value, 'from')
  },

  onInputInputRangePriceTo(e) {
    handleInputPriceFrom(e.target.value, 'to')
  },

  getProductsFromSearchForm(word, product) {
    return product.filter(prod => {
      const regex = new RegExp(word, 'gi')
      return prod.match(regex)
    })
  },

  addEventListener() {
    const searchInput = document.querySelector('.search')
    const elPriceFromRange = document.querySelector('#priceFrom')
    const elPriceToRange = document.querySelector('#priceTo')
    const elSelectSorting = document.querySelector('#select-sorting')
    const elSelectProductsOnPage = document.querySelector('#products-on-page')

    elSelectProductsOnPage.addEventListener(
      'change',
      this.onChangeSelectProductsOnPage
    )
    elSelectSorting.addEventListener('change', this.onChangeSelectSorting)
    searchInput.addEventListener('change', this.renderLeftOptions)
    searchInput.addEventListener('keyup', this.renderLeftOptions)

    elPriceFromRange.addEventListener('input', this.onChangeInputRange)
    elPriceToRange.addEventListener('input', this.onChangeInputRange)
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

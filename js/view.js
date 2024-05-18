const view = {
  rednerPaginationClear() {
    const paginator = document.querySelector('.paginator')
    paginator.innerHTML = ''
  },

  renderPagination() {
    const paginator = document.querySelector('.paginator')
    let itemsCount = model.pricedProducts.length
    let pagesCount = Math.ceil(itemsCount / model.productsOnPage)
    // console.log(pagesCount)
    for (let i = 0; i < pagesCount; i++) {
      // console.log(i)
      let page = generatePaginaionPage(i)
      paginator.appendChild(page)
    }
  },

  onFiltrateClick() {
    controller.handleUpdateProducts(false)
  },

  async onLoadCatalog() {
    await controller.handleUpdateProducts(true)
    // controller.checkAndSetSearchQuery()
    controller.handleFilter()
    document.querySelector('#filtrate').onclick =
      this.onFiltrateClick.bind(this)
    this.addEventListener()
    this.renderFilterCheckboxes()
    this.renderSortSelect()
    this.paginationListener()
    this.paginationBoldfirstElOnload()
    this.renderRangeWrap()
    this.searchFilter()
    this.renderRangeWrap()
    this.goToProductPageClick()
    this.onChangeElSelectPaginationListener()
  },
  onChangeElSelectPaginationListener() {
    const elSelectPagination = document.querySelector('#select-pagination')
    elSelectPagination.addEventListener(
      'change',
      this.onChangeElSelectPagination
    )
  },
  onChangeElSelectPagination(e) {
    const itemsOnPage = e.target.value
    controller.onChangeElSelectPaginationHandler(itemsOnPage)
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
    searchBtn.addEventListener('click', this.onSearchSubmitClick)
  },
  onClickGoToProductPage(e) {
    e.preventDefault
    const wrapProduct = e.target.parentNode.parentNode.parentNode
    const id = wrapProduct.querySelector('.id>span').innerHTML
    controller.goToProductPageHandler(id)
  },
  onSearchSubmitClick(e) {
    e.preventDefault()
    const searchInput = document.querySelector('.search')
    controller.searchHandler(searchInput.value)
  },

  paginationListener() {
    const pagination = document.querySelector('.paginator')
    pagination.addEventListener('click', view.onClickPagination)
  },
  onClickPagination(e) {
    let bold = e.target
    const boldEl = document.querySelector('.bold')
    boldEl.classList.remove('bold')
    let pagNum = e.target.innerHTML
    bold.classList.add('bold')
    pagNum = parseInt(pagNum.replace(/[^\d]/g, ''))

    if (pagNum.toString().length <= 2) {
      controller.onClickPaginationHandler(pagNum)
    }
  },
  paginationBoldfirstElOnload() {
    const elPaginator = document.querySelector('.paginator')
    if (elPaginator.childNodes.length > 0) {
      elPaginator.childNodes[0].classList.add('bold')
    }
  },
  renderSortSelect() {
    const elSelect = document.querySelector('#select-products')
    elSelect.addEventListener('change', this.onChangeSelectHandler)
  },
  onChangeSelectHandler(e) {
    const elSelect = document.querySelector('#select-products')
    elSelectValue = elSelect.value
    controller.handlerElSelect(elSelectValue)
  },

  renderContainerProducts(products) {
    products.forEach(this.renderContainerProduct)
  },

  renderContainerProduct(product) {
    const elContainerProducts = document.querySelector('.container-products')
    const elProduct = generateProduct(product)
    elContainerProducts.appendChild(elProduct)
  },
  renderCardMainOnsearch(searchedProducts) {
    searchedProducts.forEach(this.renderCardProductsOnSearch)
  },
  renderCardProductsOnSearch(product) {
    const elMain = document.querySelector('.main')
    const elProduct = generateProduct(product)
    elMain.appendChild(elProduct)
  },

  renderContainerProductsClear() {
    let elContainerProducts = document.querySelector('.container-products')
    elContainerProducts.innerHTML = ''
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

  renderFilterCheckboxes() {
    const elCheckboxes = document.querySelectorAll(
      '.wrap-checkboxes [type="checkbox"]'
    )
    elCheckboxes.forEach(chBox => {
      chBox.addEventListener('change', this.onChangeFilterCheckbox)
    })
  },

  onChangeFilterCheckbox(e) {
    const id = e.target.getAttribute('id')
    controller.handleFilterCheckbox(id, e.target.checked)
  },

  getProductsFromSearchForm(word, product) {
    return product.filter(prod => {
      const regex = new RegExp(word, 'gi')
      return prod.match(regex)
    })
  },

  addEventListener() {
    const searchInput = document.querySelector('.search')
    searchInput.addEventListener('change', this.renderLeftOptions)
    searchInput.addEventListener('keyup', this.renderLeftOptions)

    const elPriceFromRange = document.querySelector('#priceFrom')
    const elPriceToRange = document.querySelector('#priceTo')

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
  renderContainerProductsOnZeroSearch() {
    const elParagraph = generateParagraphFindNothing()
    // console.log(elParagraph)
    const elContainerProducts = document.querySelector('.container-products')
    // console.log(elContainerProducts)
    elContainerProducts.appendChild(elParagraph)
  },
}

if (location.pathname.toLowerCase().includes('/card.html')) {
  // console.log('card')
  document.addEventListener('DOMContentLoaded', view.onLoadedCard.bind(view))
} else {
  // console.log('catalog')
  document.addEventListener('DOMContentLoaded', view.onLoadCatalog.bind(view))
}

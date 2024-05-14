const controller = {
  async handleUpdateProducts(isLoad = true) {
    if (isLoad) {
      await Promise.all([model.updateCourse(), model.updateProducts()])
      model.pagination(0).forEach(product => {
        view.renderContainerProducts(product)
      })
      this.renderPagination()
      view.paginationBoldfirstElOnload()
    } else {
      model.filtrateProducts()
      this.handlePriceFilter()
      view.renderContainerProductsClear()
      model.sortedProducts = model.pricedProducts
      model.pagination(0).forEach(product => {
        view.renderContainerProducts(product)
      })
      this.rednerPaginationClear()
      this.renderPagination()
      view.renderSortSelect()
      view.paginationBoldfirstElOnload()
      if (model.paginatedProducts.length === 0) {
        view.renderContainerProductsOnZeroSearch()
      }
    }
  },
  onChangeElSelectPaginationHandler(itemsOnPage) {
    if (itemsOnPage > 0) {
      model.productsOnPage = itemsOnPage

      view.renderContainerProductsClear()
      model.sortedProducts = model.pricedProducts
      model.pagination(0).forEach(product => {
        view.renderContainerProducts(product)
      })
      this.rednerPaginationClear()
      this.renderPagination()
      view.renderSortSelect()
      view.paginationBoldfirstElOnload()
    }
  },
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
  onClickPaginationHandler(pageNum) {
    console.log(pageNum)
    model.pagination(pageNum)
    view.renderContainerProductsClear()
    model.pagination(pageNum).forEach(product => {
      view.renderContainerProducts(product)
    })
  },
  handlePriceFilter() {
    const priceFrom = document.querySelector('#priceFrom').value
    const priceTo = document.querySelector('#priceTo').value
    model.filtrateProductsByPrice(priceFrom, priceTo)
  },
  handleFilter() {
    model.makeFilter()
    const filter = model.getFilter()
    view.renderElWrapCheckboxClear()
    view.renderWrapFilter(filter)
  },

  handleFilterCheckbox(id, actionAdd) {
    if (actionAdd) {
      model.addCheckedCheckboxes(id)
    } else {
      model.removeCheckedCheckboxes(id)
    }
    console.log(model.checkedFilters)
  },
  handlerElSelect(elSelectValue) {
    model.sortProducts(elSelectValue)
    view.renderContainerProductsClear()
    model.pagination(0).forEach(product => {
      view.renderContainerProducts(product)
    })
    view.paginationBoldfirstElOnload()
  },

  handleSearchFilter() {
    model.makeFilter()
    const filter = model.getFilter()
    view.renderElWrapCheckboxClear()
    view.renderWrapFilter(filter)
  },

  // ??? 🧨 //

  searchHandler(query) {
    model.searchQuery = query
    model.searchProducts()
    // makeFilter() ???
    model.filtrateProducts()
    model.filtrateProductsByPrice(0, 20000000)
    model.sortedProducts = model.pricedProducts
    view.renderContainerProductsClear()
    model.pagination(0).forEach(product => {
      view.renderContainerProducts(product)
    })
    this.handleSearchFilter()
    let maxPrice = model.getMaxPriceUAH()
    let minPrice = model.getMinPriceUAH()

    if (!isFinite(+maxPrice) || !isFinite(+minPrice)) {
      maxPrice = 0
      minPrice = 0
    }
    view.renderRangeWrapOnSearch(maxPrice, minPrice)
    this.rednerPaginationClear()
    this.renderPagination()
    view.paginationBoldfirstElOnload()
    view.renderFilterCheckboxes()
    view.renderSortSelect()

    if (model.paginatedProducts.length === 0) {
      view.renderContainerProductsOnZeroSearch()
    }
  },

  async handleUpdateProduct(id) {
    await model.updateProduct(id)
    await model.updateCourse()
  },

  handleRenderProduct() {
    const product = model.getProduct()
    cardGenerator.generateProductCard(product)
    view.renderMain(product)
  },

  async handleSimilarProducts(id) {
    await model.updateSimilarProductsIdList(id)
  },

  async handleSimilarProductsSection() {
    await model.updateSimilarProducts()
    model.similarProducts.forEach(similarProduct => {
      view.renderSimilarProducts(similarProduct)
    })
  },
}

const controller = {
  async handleUpdateProducts(isLoad = true) {
    if (isLoad) {
      // console.time()
      // await model.updateCourse()
      // await model.updateProducts()

      await Promise.all([model.updateCourse(), model.updateProducts()])

      // console.timeEnd()
      model.pagination(0).forEach(product => {
        view.renderContainerProducts(product)
        // console.log('hello')
      })
      this.renderPagination()
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
    }
  },
  async goToProductPageHandler() {
    // await card_controller.handleUpdateProduct(id)
    await card_view.onLoadedCard()
  },

  rednerPaginationClear() {
    const paginator = document.querySelector('.paginator')
    paginator.innerHTML = ''
  },
  renderPagination() {
    const paginator = document.querySelector('.paginator')
    let itemsCount = model.pricedProducts.length
    let itemsPerPage = 7
    let pagesCount = itemsCount / itemsPerPage
    for (let i = 1; i < pagesCount; i++) {
      let page = generatePaginaionPage(i)
      // console.log(page)
      paginator.appendChild(page)
    }
  },
  onClickPaginationHandler(pageNum) {
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
    model.filter = {}
    model.makeFilter()
    const filter = model.getFilter()
    view.renderElWrapCheckboxClear()
    view.renderWrapFilter(filter)
  },

  handleSearchFilter() {
    model.makeFilterForSeachProducts()
    const filter = model.getSearchedFilter()
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
    // console.log(elSelectValue)
    model.sortProducts(elSelectValue)
    // console.log(model.sortedProducts)
    view.renderContainerProductsClear()
    model.pagination(0).forEach(product => {
      view.renderContainerProducts(product)
    })
  },
  searchHandler(query) {
    model.searchQuery = query
    model.searchProducts()
    model.filtrateProducts()
    model.filtrateProductsByPrice(0, 20000000)
    model.sortedProducts = model.pricedProducts
    view.renderContainerProductsClear()
    model.pagination(0).forEach(product => {
      view.renderContainerProducts(product)
    })
    this.handleSearchFilter()
    const maxPrice = model.getMaxPriceSearchedProductsUAH()
    const minPrice = model.getMinPriceSearchedProductsUAH()
    view.renderRangeWrapOnSearch(maxPrice, minPrice)
    this.rednerPaginationClear()
    this.renderPagination()
    view.renderFilterCheckboxes()
    view.renderSortSelect()
    // console.log('searchedProducts', model.searchedProducts.length)
    // console.log('filtratedProducts', model.filtratedProducts.length)
    // console.log('pricedProducts', model.pricedProducts.length)
    // console.log('sortedProducts', model.sortedProducts.length)
    // console.log('paginatedProducts', model.paginatedProducts.length)
  },
}

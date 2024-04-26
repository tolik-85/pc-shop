const controller = {
  async handleUpdateProducts(isLoad = true) {
    if (isLoad) {
      await model.updateProducts()
      model.pagination(0).forEach(product => {
        view.renderContainerProducts(product)
        console.log('hello')
      })
      this.renderPagination()
    } else {
      console.log('hello')
      model.filtrateProducts()
      this.handlePriceFilter()
      view.renderContainerProductsClear()
      model.pagination(0).forEach(product => {
        view.renderContainerProducts(product)
        model.sortedProducts = model.pricedProducts
        this.rednerPaginationClear()
        this.renderPagination()
        console.log('searchedProducts', model.searchedProducts.length)
        console.log('filtratedProducts', model.filtratedProducts.length)
        console.log('pricedProducts', model.pricedProducts.length)
        console.log('sortedProducts', model.sortedProducts.length)
        console.log('paginatedProducts', model.paginatedProducts.length)
      })
    }
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
    // let currentPage = pagNum
    for (let i = 0; i < pagesCount; i++) {
      let page = generatePaginaionPage(i)
      paginator.appendChild(page)
    }
  },
  onClickPaginationHandler(pageNum) {
    model.pagination(pageNum)
    view.renderContainerProductsClear()
    model.pagination(pageNum).forEach(product => {
      view.renderContainerProducts(product)
      // this.renderPagination()
    })
  },
  handlePriceFilter() {
    const priceFrom = document.querySelector('#priceFrom').value
    const priceTo = document.querySelector('#priceTo').value
    console.log()
    model.filtrateProductsByPrice(priceFrom, priceTo)
  },
  handleFilter() {
    model.filter = {}
    model.makeFilter()
    const filter = model.getFilter()
    model.updateCourse()
    view.renderElWrapCheckboxClear()
    view.renderWrapFilter(filter)
  },

  handleSearchFilter() {
    model.makeFilterForSeachProducts()
    const filter = model.getSearchedFilter()
    // model.updateCourse()
    view.renderElWrapCheckboxClear()
    view.renderWrapFilter(filter)
  },
  handlePricedFilter() {
    model.makeFilterForPricedProducts()
    const filter = model.getPricedFilter()
    // model.updateCourse()
    view.renderElWrapCheckboxClear()
    view.renderWrapFilter(filter)
  },

  handleFilterCheckbox(id, actionAdd) {
    // console.log(actionAdd)
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
    model.getFiltratedProducts().forEach(product => {
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
  },
}

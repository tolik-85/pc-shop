const controller = {
  async handleUpdateProducts(isLoad = true) {
    if (isLoad) {
      await model.updateProducts()
      model.pagination(0).forEach(product => {
        view.renderContainerProducts(product)
      })
      this.renderPagination()
      // model.pagination(0)
    } else {
      model.filtrateProducts()
      this.handlePriceFilter()
      view.renderContainerProductsClear()
      model.pagination(0).forEach(product => {
        view.renderContainerProducts(product)
        this.handleFilter()
        view.renderFilterCheckboxes()
        this.rednerPaginationClear()
        this.renderPagination()
      })
    }
  },
  rednerPaginationClear() {
    const paginator = document.querySelector('.paginator')
    paginator.innerHTML = ''
  },
  renderPagination() {
    const paginator = document.querySelector('.paginator')
    let itemsCount = model.filtratedStartArr.length
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
    model.filtrateProductsByPrice(priceFrom, priceTo)
  },
  handleFilter() {
    model.filter = {}
    model.makeFilterForFiltratedStartArr()
    const filter = model.getFilter()
    model.updateCourse()
    view.renderElWrapCheckboxClear()
    view.renderWrapFilter(filter)
  },
  // handleFilter() {
  //   model.makeFilter()
  //   const filter = model.getFilter()
  //   model.updateCourse()
  //   view.renderWrapFilter(filter)
  // },

  handleSearchFilter() {
    // model.makeFilterForSeachProducts()
    // const filter = model.getSearchedFilter()
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
    model.searchProducts(query)
    view.renderContainerProductsClear()
    model.getFiltratedStartArr().forEach(product => {
      view.renderContainerProducts(product)
      this.handleFilter()
      view.renderFilterCheckboxes()
    })
  },
}

const controller = {
  async handleUpdateProducts(isLoad = true) {
    if (isLoad) {
      await model.updateProducts()
    } else {
      model.filtrateProducts()
      model.filtrateProductsByPrice()
    }
    if (model.pricedProducts.length > 0) {
      view.renderContainerProductsClear()
      model.getPricedProducts().forEach(product => {
        view.renderContainerProducts(product)
        this.handlePricedFilter()
        view.renderFilterCheckboxes()
      })
    } else {
      view.renderContainerProductsClear()
      model.getFiltratedProducts().forEach(product => {
        view.renderContainerProducts(product)
      })
    }
  },
  onClickPaginationHandler(pagNum) {
    let productsPagin = model.pagination(pagNum)
    view.renderContainerProductsClear()
    productsPagin.forEach(product => {
      view.renderContainerProducts(product)
    })
  },

  handleFilter() {
    model.makeFilter()
    const filter = model.getFilter()
    model.updateCourse()
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
  searchHandler(searchedData) {
    model.filtrateProductsBySearch(searchedData)
    view.renderContainerProductsClear()
    model.getSearchedProducts().forEach(product => {
      view.renderContainerProducts(product)
    })
    this.handleSearchFilter()
    view.renderFilterCheckboxes()
  },
}

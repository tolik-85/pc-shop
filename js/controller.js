const controller = {
  async handleUpdateProducts(isLoad = true) {
    if (isLoad) {
      await model.updateProducts()
    } else {
      model.filtrateProducts()
      model.filtrateProductsByPrice()
    }

    view.renderContainerProductsClear()
    model.getFiltratedProducts().forEach(product => {
      view.renderContainerProducts(product)
    })
  },

  handleFilter() {
    model.makeFilter()
    const filter = model.getFilter()
    view.renderWrapFilter(filter)
  },

  handleFilterCheckbox(id, actionAdd) {
    // console.log(actionAdd)
    if (actionAdd) {
      model.addCheckedCheckboxes(id)
    } else {
      model.removeCheckedCheckboxes(id)
    }
    // console.log(model.checkedFilters)
  },
  handlerElSelect(elSelectValue) {
    model.sortProducts(elSelectValue)
    view.renderContainerProductsClear()
    model.getFiltratedProducts().forEach(product => {
      view.renderContainerProducts(product)
    })
  },
}

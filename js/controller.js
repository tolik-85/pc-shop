const controller = {
  async handleUpdateProducts(isLoad = true) {
    if (isLoad) {
      await model.updateProducts()
    } else {
      model.filtrateProducts(2)
    }
    // console.log(model.getFiltratedProducts())

    model.getFiltratedProducts().forEach(product => {
      view.renderContainerProducts(product)
    })
  },

  handleFilter() {
    model.makeFilter()
    const filter = model.getFilter()
    view.renderWrapFilter(filter)
    // view.renderLabel()
  },

  handleFilterCheckbox(id, actionAdd) {
    console.log(actionAdd)
    if (actionAdd) {
      model.addCheckedCheckboxes(id)
    } else {
      model.removeCheckedCheckboxes(id)
    }
    console.log(model.checkedFilters)
  },
}

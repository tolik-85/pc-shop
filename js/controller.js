const controller = {
  async handleUpdateProducts() {
    await model.updateProducts()

    model.getProducts().forEach(product => {
      view.renderContainerProducts(product)
    })
  },

  handleFilter() {
    model.makeFilter()
    const filter = model.getFilter()
    view.renderWrapFilter(filter)
    view.renderLabel()
  },
}

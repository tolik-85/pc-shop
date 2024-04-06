const controller = {
  async handleUpdateProducts() {
    await model.updateProducts()

    model.getProducts().forEach(product => {
      const URL = 'https://web-app.click/photos/products/computers/'
      const picture = product.photos.files[0]
      const purpose = product.purpose
      const caption = product.caption
      const price = product.price
      const image = `${URL}${picture}`
      view.renderContainerProducts(purpose, caption, price, image, product)
    })
  },

  handleFilter() {
    model.makeFilter()
    const filter = model.getFilter()
    view.renderWrapFilter(filter)
  },
}

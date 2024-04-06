const controller = {
  async handleAvailibleProducts() {
    const products = await model.getProducts()
    model.setAvalibleProducts(products)
    model.avalibleProducts.forEach(el => {
      const URL = 'https://web-app.click/photos/products/computers/'
      const picture = el.photos.files[0]
      const purpose = el.purpose
      const caption = el.caption
      const price = el.price
      const image = `${URL}${picture}`
      view.renderContainerProducts(purpose, caption, price, image)
    })
  },

  handleFilter() {
    model.filterForCategories()
  },

  renderWrapFilter() {
    for (const key in model.filter) {
      const elFilterCategory = view.generateFilterCategory(key)
      const elWrapFilter = document.querySelector('.wrap-filter')
      elWrapFilter.appendChild(elFilterCategory)
      for (const name in model.filter[key]) {
        const elFilterSubCategory = view.generateFilterSubCategory(name)
        const elFilterGroupWrappers = view.generateFilterGroupWrappers()
        elFilterCategory.appendChild(elFilterSubCategory)
        elFilterSubCategory.appendChild(elFilterGroupWrappers)
        for (let value of model.filter[key][name]) {
          const chBoxes = view.generateFilterWrapCheckBox(value)
          elFilterGroupWrappers.appendChild(chBoxes)
        }
      }
    }
  },
}

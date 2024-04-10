const view = {
  onFiltrateClick() {
    controller.handleUpdateProducts(false)
  },

  async onLoaded() {
    await model.updateCourse()
    await controller.handleUpdateProducts()
    controller.handleFilter()
    document.querySelector('#filtrate').onclick =
      this.onFiltrateClick.bind(this)
  },

  // ...
  // browser.onclick = callback

  // browser.onclick()
  // ...

  renderContainerProducts(product) {
    const elContainerProducts = document.querySelector('.container-products')
    const ElProduct = generateProduct(product)
    elContainerProducts.appendChild(ElProduct)
  },

  renderWrapFilter(filter) {
    const elWrapFilter = document.querySelector('.wrap-filter')
    for (const key in filter) {
      const elFilterCategory = generateFilterCategory(key)
      elWrapFilter.appendChild(elFilterCategory)
      for (const name in filter[key]) {
        const elFilterSubCategory = generateFilterSubCategory(name)
        const elFilterGroupWrappers = generateFilterGroupWrappers()
        elFilterCategory.appendChild(elFilterSubCategory)
        elFilterSubCategory.appendChild(elFilterGroupWrappers)
        for (const value of filter[key][name]) {
          const chBoxes = generateFilterWrapCheckBox(value, name, key)
          elFilterGroupWrappers.appendChild(chBoxes)
        }
      }
    }
  },
}

document.addEventListener('DOMContentLoaded', view.onLoaded.bind(view))

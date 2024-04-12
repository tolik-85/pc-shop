// render
// generate
// on

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
    this.addEventListener()
    this.renderFilterCheckboxes()
  },

  renderContainerProducts(product) {
    let elContainerProducts = document.querySelector('.container-products')
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
  renderRangeWrap() {
    const elPriceFromRange = document.querySelector('#priceFrom')
    const elPriceToRange = document.querySelector('#priceTo')
    const elSpanRangePriceFrom = document.querySelector('.price-from')
    const elSpanRangePriceTo = document.querySelector('.price-to')

    elSpanRangePriceFrom.innerHTML = elPriceFromRange.value
    elSpanRangePriceTo.innerHTML = elPriceToRange.value
  },
  onChangeInputRange() {
    view.renderRangeWrap()
  },

  renderFilterCheckboxes() {
    const elCheckboxes = document.querySelectorAll(
      '.wrap-filter [type="checkbox"]'
    )
    elCheckboxes.forEach(chBox => {
      chBox.addEventListener('change', this.onChangeFilterCheckbox)
    })
  },

  onChangeFilterCheckbox(e) {
    const id = e.target.getAttribute('id')
    controller.handleFilterCheckbox(id, e.target.checked)
  },

  getProductsFromSearchForm(word, product) {
    return product.filter(prod => {
      const regex = new RegExp(word, 'gi')
      return prod.match(regex)
    })
  },

  renderLeftOptions() {
    // const searchInput = document.querySelector('.search')
    const searchOptions = document.querySelector('.options')
    const productsNames = model.getProductsNames()
    const options = view.getProductsFromSearchForm(this.value, productsNames)

    const result = options
      .map(productName => {
        return `<li><span>${productName}</span></li>`
      })
      .join('')
    searchOptions.innerHTML = this.value ? result : null
  },

  addEventListener() {
    const searchInput = document.querySelector('.search')
    searchInput.addEventListener('change', this.renderLeftOptions)
    searchInput.addEventListener('keyup', this.renderLeftOptions)

    const elPriceFromRange = document.querySelector('#priceFrom')
    const elPriceToRange = document.querySelector('#priceTo')

    elPriceFromRange.addEventListener('input', this.onChangeInputRange)
    elPriceToRange.addEventListener('input', this.onChangeInputRange)
  },
}

document.addEventListener('DOMContentLoaded', view.onLoaded.bind(view))

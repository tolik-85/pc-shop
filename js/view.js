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
    this.getCheckedCheckboxes()
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

  getCheckedCheckboxes() {
    const elCheckboxes = document.querySelectorAll('input[type="checkbox"]')
    elCheckboxes.forEach(chBox => {
      chBox.addEventListener('change', function () {
        if (this.checked) {
          const id = chBox.getAttribute('id')
          model.checkedCheckBoxes.push(id)
          console.log(model.checkedCheckBoxes)
        } else {
          const id = chBox.getAttribute('id')
          const index = model.checkedCheckBoxes.indexOf(id)
          model.checkedCheckBoxes.splice(index, 1)
          console.log(model.checkedCheckBoxes)
        }
      })
    })
  },
  // checkBoxChange() {
  //   if (chBox.checked) {
  //     console.log('Checkbox выбран')
  //   } else {
  //     console.log('Checkbox не выбран')
  //   }
  // },
}

document.addEventListener('DOMContentLoaded', view.onLoaded.bind(view))

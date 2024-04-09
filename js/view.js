const view = {
  async onLoaded() {
    await controller.handleUpdateProducts()
    controller.handleFilter()
  },
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

  // renderLabel() {
  //   model.products.forEach(item => {
  //     // console.log(item)
  //     for (const key in item.specs) {
  //       // console.log(item.specs)
  //       for (const name in item.specs[key]) {
  //         // console.log(name)
  //         for (const value in item.specs[key][name]) {
  //           // console.log(item.specs[key][name])
  //           const val = item.specs[key][name]
  //           let paramFor = `${item.specs[key][name]}_${key}`
  //           // console.log(paramFor)
  //           // console.log(val)
  //           const elLabel = generateLabel(val, paramFor)
  //           const elForLabel = document.querySelector('.for-label')
  //           elForLabel.appendChild(elLabel)
  //         }
  //       }
  //     }
  //   })
  // },
  // renderLabel() {
  //   model.products.forEach(item => {
  //     for (key in item.specs) {
  //       // console.log(key)
  //       for (key2 in item.specs[key]) {
  //         // console.log(key2)
  //         for (key3 in item.specs[key][key2]) {
  //           // console.log(item.specs[key][key2])
  //           const elLabel = generateLabel(
  //             `${key}`,
  //             `${item.specs[key][key2]}_${key}`
  //           )
  //           const elForLabel = document.querySelector('.for-label')
  //           elForLabel.appendChild(elLabel)
  //         }
  //       }
  //     }
  //   })
  // },
}

document.addEventListener('DOMContentLoaded', view.onLoaded)

const view = {
  async onLoaded() {
    await controller.handleUpdateProducts()
    controller.handleFilter()
  },
  renderContainerProducts(product) {
    const elContainerProducts = document.querySelector('.container-products')
    const ElProduct = this.generateProduct(product)
    elContainerProducts.appendChild(ElProduct)
  },

  generateFilterCategory(filterCategory) {
    const elWrapProps = document.createElement('div')
    const elH3 = document.createElement('h3')
    elWrapProps.classList.add('filter-category')
    elH3.innerHTML = `${filterCategory}`
    elWrapProps.appendChild(elH3)
    return elWrapProps
  },
  generateFilterSubCategory(filterSubCategoty) {
    const elWrapSubcategory = document.createElement('div')
    const elH4 = document.createElement('h4')
    elWrapSubcategory.classList.add('filter-subcategoru')
    elH4.innerHTML = `${filterSubCategoty}`
    elWrapSubcategory.appendChild(elH4)
    return elWrapSubcategory
  },

  generateFilterGroupWrappers() {
    const elGroupWrappers = document.createElement('div')
    elGroupWrappers.classList.add('group-wrappers')
    return elGroupWrappers
  },

  generateFilterWrapCheckBox(value, name, key) {
    const elWrap = document.createElement('div')
    const elWrapCheckBox = document.createElement('div')
    const elInputCheckbBox = document.createElement('input')

    elWrap.classList.add('wrap')
    elWrapCheckBox.classList.add('wrap-checkbox')
    elInputCheckbBox.setAttribute('type', 'checkbox')
    elInputCheckbBox.setAttribute('name', `${value}`)
    elInputCheckbBox.setAttribute('id', `${key}_${name}_${value}`)
    elInputCheckbBox.setAttribute('value', `${value}`)
    const elLabelForCheckbox = document.createElement('label')
    elLabelForCheckbox.setAttribute('for', `${key}_${name}_${value}`)
    elLabelForCheckbox.innerHTML = `${value}`

    elWrapCheckBox.appendChild(elInputCheckbBox)
    elWrapCheckBox.appendChild(elLabelForCheckbox)

    return elWrapCheckBox
  },

  generateLabel(paramInner, paramFor) {
    const elLabel = document.createElement('label')
    elLabel.innerHTML = paramInner
    elLabel.setAttribute('for', paramFor)
    return elLabel
  },

  generateProduct(product) {
    const URL = 'http://35.225.111.193:8181/img/products/'
    const picture = product.photos.files[0]
    const purpose = product.purpose
    const caption = product.caption
    const price = (product.price * 40).toFixed()
    const image = `${URL}${picture}`

    let ssd = 'Накопитель SSD'
    let motherBoard = 'Материнская плата'
    let ram = 'Оперативная память'
    let processor = 'Процессор'

    console.log(Object.keys(product.specs[ssd]))

    const wrapProduct = document.createElement('div')
    const wrapImg = document.createElement('div')
    const img = document.createElement('img')
    const divForH3 = document.createElement('div')
    const h3 = document.createElement('h3')
    const divForLabels = document.createElement('div')
    const laberForBrand = document.createElement('label')
    const laberForSsdCapacity = document.createElement('label')
    const laberForRam = document.createElement('label')
    const laberForGpu = document.createElement('label')
    const laberForSsd = document.createElement('label')
    const divForPrice = document.createElement('div')
    const parForPrice = document.createElement('p')
    const row = document.createElement('div')
    const divForCart = document.createElement('div')
    const cartBtn = document.createElement('button')
    const divForFavorites = document.createElement('div')
    const favoritesBtn = document.createElement('button')
    const divForCompare = document.createElement('div')
    const compareBtn = document.createElement('button')

    divForLabels.classList.add('for-label')
    wrapProduct.classList.add('wrap-product')
    wrapImg.classList.add('wrap-img')
    img.setAttribute('src', `${image}`)
    img.setAttribute('alt', 'product')
    h3.innerHTML = `${caption}`
    laberForSsdCapacity.setAttribute(
      'for',
      `${product.specs[ssd].capacity}_${ssd}`
    )
    laberForSsdCapacity.innerHTML = `${product.specs[ssd].capacity}`
    laberForSsd.setAttribute('for', `${product.specs[ssd].brand}_${ssd}`)
    laberForSsd.innerHTML = `${product.specs[ssd].brand}`
    laberForBrand.setAttribute(
      'for',
      `${product.specs[motherBoard]?.brand}_${motherBoard}`
    )
    laberForBrand.innerHTML = `${product.specs[motherBoard]?.brand}`
    laberForRam.setAttribute('for', `${product.specs[ram]?.frequency}_${ram}`)
    laberForRam.innerHTML = `${product.specs[ram]?.frequency}`
    laberForGpu.setAttribute(
      'for',
      `${product.specs[processor]?.brand}_${processor}`
    )
    laberForGpu.innerHTML = `${product.specs[processor]?.brand}`
    parForPrice.innerHTML = `<b>${price}</b> грн`
    row.classList.add('row')

    wrapImg.appendChild(img)
    divForH3.appendChild(h3)
    divForLabels.appendChild(laberForSsdCapacity)
    divForLabels.appendChild(laberForSsd)
    divForLabels.appendChild(laberForBrand)
    divForLabels.appendChild(laberForGpu)
    divForLabels.appendChild(laberForRam)
    divForPrice.appendChild(parForPrice)
    divForCart.appendChild(cartBtn)
    divForFavorites.appendChild(favoritesBtn)
    divForCompare.appendChild(compareBtn)
    row.appendChild(divForCart)
    row.appendChild(divForFavorites)
    row.appendChild(divForCompare)

    wrapProduct.appendChild(wrapImg)
    wrapProduct.appendChild(divForH3)
    wrapProduct.appendChild(divForLabels)
    wrapProduct.appendChild(divForPrice)
    wrapProduct.appendChild(row)

    return wrapProduct
  },

  renderWrapFilter(filter) {
    const elWrapFilter = document.querySelector('.wrap-filter')
    for (const key in filter) {
      const elFilterCategory = view.generateFilterCategory(key)
      elWrapFilter.appendChild(elFilterCategory)
      for (const name in filter[key]) {
        const elFilterSubCategory = view.generateFilterSubCategory(name)
        const elFilterGroupWrappers = view.generateFilterGroupWrappers()
        elFilterCategory.appendChild(elFilterSubCategory)
        elFilterSubCategory.appendChild(elFilterGroupWrappers)
        for (const value of filter[key][name]) {
          const chBoxes = view.generateFilterWrapCheckBox(value, name, key)
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
  //           const elLabel = view.generateLabel(val, paramFor)
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
  //           const elLabel = view.generateLabel(
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

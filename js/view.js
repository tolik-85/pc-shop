const view = {
  async onLoaded() {
    await controller.handleUpdateProducts()
    controller.handleFilter()
  },
  renderContainerProducts(purpose, caption, price, image, product) {
    const elContainerProducts = document.querySelector('.container-products')
    const ElProduct = this.generateProduct(
      purpose,
      caption,
      price,
      image,
      product
    )
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

  generateFilterWrapCheckBox(brand, name) {
    const elWrap = document.createElement('div')
    const elWrapCheckBox = document.createElement('div')
    const elInputCheckbBox = document.createElement('input')

    elWrap.classList.add('wrap')
    elWrapCheckBox.classList.add('wrap-checkbox')
    elInputCheckbBox.setAttribute('type', 'checkbox')
    elInputCheckbBox.setAttribute('name', `${brand}`)
    elInputCheckbBox.setAttribute('id', `${brand}_${name}`)
    elInputCheckbBox.setAttribute('value', `${brand}_01`)
    const elLabelForCheckbox = document.createElement('label')
    elLabelForCheckbox.setAttribute('for', `${brand}_${name}`)
    elLabelForCheckbox.innerHTML = `${brand}`

    elWrapCheckBox.appendChild(elInputCheckbBox)
    elWrapCheckBox.appendChild(elLabelForCheckbox)

    return elWrapCheckBox
  },
  generateProduct(purpose, caption, price, image, product) {
    const URL = 'https://web-app.click/photos/products/computers/'
    const wrapProduct = document.createElement('div')
    const wrapImg = document.createElement('div')
    const img = document.createElement('img')
    const divForH3 = document.createElement('div')
    const h3 = document.createElement('h3')
    const divForLabels = document.createElement('div')
    const laberForBrand = document.createElement('label')
    const laberForpurpose = document.createElement('label')
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

    wrapProduct.classList.add('wrap-product')
    wrapImg.classList.add('wrap-img')
    img.setAttribute('src', `${image}`)
    img.setAttribute('alt', 'product')
    h3.innerHTML = `${caption}`
    laberForpurpose.setAttribute('for', 'purpose')
    laberForpurpose.innerHTML = `${purpose}`
    laberForBrand.setAttribute('for', 'brand_01')
    laberForBrand.innerHTML = 'ASUS'
    laberForRam.setAttribute('for', 'ram_03')
    laberForRam.innerHTML = '16 Gb'
    laberForGpu.setAttribute('for', 'gpu_03')
    laberForGpu.innerHTML = 'Radeon RX'
    laberForSsd.setAttribute('for', 'ssd_03')
    laberForSsd.innerHTML = '1 Tb'
    parForPrice.innerHTML = `<b>${price}</b> грн`
    row.classList.add('row')

    wrapImg.appendChild(img)
    divForH3.appendChild(h3)
    divForLabels.appendChild(laberForBrand)
    divForLabels.appendChild(laberForGpu)
    divForLabels.appendChild(laberForRam)
    divForLabels.appendChild(laberForSsd)
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
          const chBoxes = view.generateFilterWrapCheckBox(value, key)
          elFilterGroupWrappers.appendChild(chBoxes)
        }
      }
    }
  },
}

document.addEventListener('DOMContentLoaded', view.onLoaded)

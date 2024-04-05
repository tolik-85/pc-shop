document.addEventListener('DOMContentLoaded', onLoaded)

async function onLoaded() {
  await handleAvailibleProducts()

  model.filters.filterForCategories()
  // model.filters.filterForVideoCardBrand()
  // model.filters.filterForVideoCardCapacity()
  // model.filters.filterForCoolerBrands()
  // model.filters.filterForCoolerSize()
  // model.filters.filterForSsdBrands()
  // model.filters.filterForSsdCapacity()
  // model.filters.filterForProcessorBrand()
  // model.filters.filterForProcessorFrequency()
  // model.filters.filterForMotherboardBrands()
  // model.filters.filterForMotherboarPurpose()
  // model.filters.filterForRamBrand()
  // model.filters.filterForRamCapacity()
  // model.filters.filterForRamType()
  // model.filters.filterForRamFrequency()
  // model.filters.filterForPowerUnitBrands()
  // model.filters.filterForPowerUnitPower()
  // model.filters.filterForCaseBrands()
  handleFilter()
}

const containerProducts = document.querySelector('.container-products')

function renderContainerProducts(purpose, caption, price, image) {
  const product = generateProduct(purpose, caption, price, image)
  containerProducts.appendChild(product)
}

function generateFilterCategory(filterCategory) {
  const wrapProps = document.createElement('div')
  wrapProps.classList.add('filter-category')

  const h3 = document.createElement('h3')
  h3.innerHTML = `${filterCategory}`

  wrapProps.appendChild(h3)

  return wrapProps
}

function generateProduct(purpose, caption, price, image) {
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
}

function generateFilterSubCategory(filterSubCategoty) {
  const wrapSubcategory = document.createElement('div')
  const wrapChBoxes = document.createElement('div')
  const h4 = document.createElement('h4')

  wrapChBoxes.classList.add('wrap-chbox')
  wrapSubcategory.classList.add('filter-subcategoru')
  h4.innerHTML = `${filterSubCategoty}`

  wrapSubcategory.appendChild(h4)

  return wrapSubcategory
}

function generateCheckBox(brand) {
  const wrap = document.createElement('div')
  const wrapCheckBox = document.createElement('div')
  const inputCheckbBox = document.createElement('input')

  wrap.classList.add('wrap')
  wrapCheckBox.classList.add('wrap-checkbox')
  inputCheckbBox.setAttribute('type', 'checkbox')
  inputCheckbBox.setAttribute('name', `${brand}`)
  inputCheckbBox.setAttribute('id', `${brand}`)
  inputCheckbBox.setAttribute('value', `${brand}_01`)
  const labelForCheckbox = document.createElement('label')
  labelForCheckbox.setAttribute('for', `${brand}`)
  labelForCheckbox.innerHTML = `${brand}`

  wrapCheckBox.appendChild(inputCheckbBox)
  wrapCheckBox.appendChild(labelForCheckbox)

  return wrapCheckBox
}

function renderFormSubmitBtn() {
  const form = document.querySelector('.wrap-filter>form')
  const submit = generateFormSubmitBtn()
  form.appendChild(submit)
}

function generateFormSubmitBtn() {
  const wrapProps = document.createElement('div')
  const noClassDiv = document.createElement('div')
  const inputSubmit = document.createElement('input')

  wrapProps.classList.add('wrap-props')
  inputSubmit.setAttribute('type', 'submit')
  inputSubmit.setAttribute('value', 'Фильтровать')
  inputSubmit.classList.add('btn')

  noClassDiv.appendChild(inputSubmit)
  wrapProps.appendChild(noClassDiv)

  return wrapProps
}

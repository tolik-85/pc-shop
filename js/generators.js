function generateFilterCategory(filterCategory) {
  const elWrapProps = document.createElement('div')
  const elH3 = document.createElement('h3')
  elWrapProps.classList.add('filter-category')
  elH3.innerHTML = `${filterCategory}`
  elWrapProps.appendChild(elH3)
  return elWrapProps
}

function generateFilterSubCategory(filterSubCategoty) {
  const elWrapSubcategory = document.createElement('div')
  const elH4 = document.createElement('h4')
  elWrapSubcategory.classList.add('filter-subcategoru')
  elH4.innerHTML = `${filterSubCategoty}`
  elWrapSubcategory.appendChild(elH4)
  return elWrapSubcategory
}

function generateFilterGroupWrappers() {
  const elGroupWrappers = document.createElement('div')
  elGroupWrappers.classList.add('group-wrappers')
  return elGroupWrappers
}

function generateFilterWrapCheckBox(value, name) {
  const elWrap = document.createElement('div')
  const elWrapCheckBox = document.createElement('div')
  const elInputCheckbBox = document.createElement('input')

  elWrap.classList.add('wrap')
  elWrapCheckBox.classList.add('wrap-checkbox')
  elInputCheckbBox.setAttribute('type', 'checkbox')
  elInputCheckbBox.setAttribute('name', `${value}_${name}`)
  elInputCheckbBox.setAttribute('id', `${name}_${value}`)
  elInputCheckbBox.setAttribute('value', `${name}`)
  const elLabelForCheckbox = document.createElement('label')
  elLabelForCheckbox.setAttribute('for', `${name}_${value}`)
  elLabelForCheckbox.innerHTML = `${value}`

  elWrapCheckBox.appendChild(elInputCheckbBox)
  elWrapCheckBox.appendChild(elLabelForCheckbox)

  return elWrapCheckBox
}

function generateLabel(text, forLabel) {
  const label = document.createElement('label')
  label.innerHTML = `${text}`
  label.setAttribute('for', `${forLabel}`)
  return label
}

function generateProduct(product) {
  const URL = 'https://web-app.click/pc-shop/photos/products/computers/'
  const picture = product.photos[0]
  // const purpose = product.purpose
  const caption = product.caption
  const price = (product.price * model.UsdCourse.rate).toFixed()
  const image = `${URL}${picture}`

  const elWrapProduct = document.createElement('div')
  const elWrapImg = document.createElement('div')
  const elImg = document.createElement('img')
  const elDivForH3 = document.createElement('div')
  const elH3 = document.createElement('h3')
  const elDivForLabels = document.createElement('div')
  const elDivForPrice = document.createElement('div')
  const elParForPrice = document.createElement('p')
  const elRow = document.createElement('div')
  const elDivForCart = document.createElement('div')
  const elCartBtn = document.createElement('button')
  const elDivForFavorites = document.createElement('div')
  const elFavoritesBtn = document.createElement('button')
  const elDivForCompare = document.createElement('div')
  const elCompareBtn = document.createElement('button')

  elDivForLabels.classList.add('for-label')
  elWrapProduct.classList.add('wrap-product')
  elWrapImg.classList.add('wrap-img')
  elImg.setAttribute('src', `${image}`)
  elImg.setAttribute('alt', 'product')
  elH3.innerHTML = `${caption}`

  elParForPrice.innerHTML = `<b>${price}</b> грн`
  elRow.classList.add('row')

  let i = 0

  for (const key in product.attributes) {
    i++
    if (i >= 8) {
      break
    }
    const label = generateLabel(
      `${product.attributes[key]}`,
      `${key}_${product.attributes[key]}`
    )
    elDivForLabels.appendChild(label)
  }

  //как получить такой обьект
  // const arr= [
  //   {copt:"500gb", for:"6GB_brand_материнская плата"}
  // ]
  elWrapImg.appendChild(elImg)
  elDivForH3.appendChild(elH3)
  elDivForPrice.appendChild(elParForPrice)
  elDivForCart.appendChild(elCartBtn)
  elDivForFavorites.appendChild(elFavoritesBtn)
  elDivForCompare.appendChild(elCompareBtn)
  elRow.appendChild(elDivForCart)
  elRow.appendChild(elDivForFavorites)
  elRow.appendChild(elDivForCompare)

  elWrapProduct.appendChild(elWrapImg)
  elWrapProduct.appendChild(elDivForH3)
  elWrapProduct.appendChild(elDivForLabels)
  elWrapProduct.appendChild(elDivForPrice)
  elWrapProduct.appendChild(elRow)

  return elWrapProduct
}

function generatePaginaionPage(pageNum) {
  const elPageSpan = document.createElement('span')
  elPageSpan.innerHTML = ` [ ${pageNum} ] `

  return elPageSpan
}

function generateOption(text) {
  const option = document.createElement('option')
  option.innerText = text

  return option
}

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
  const caption = product.caption
  const price = product.priceUAH.toFixed()
  const image = `${URL}${picture}`

  const productLink = document.createElement('a')
  const id = document.createElement('div')
  const idSpan = document.createElement('span')
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

  productLink.setAttribute('href', `card.html?id=${product.id}`)
  productLink.setAttribute('target', '_blank')
  idSpan.innerHTML = product.id
  id.classList.add('id')
  elDivForLabels.classList.add('for-label')
  elWrapProduct.classList.add('wrap-product')
  elWrapImg.classList.add('wrap-img')
  elImg.setAttribute('src', `${image}`)
  elImg.setAttribute('alt', 'product')
  elH3.innerHTML = `${caption}`
  elDivForPrice.classList.add('price')
  elParForPrice.innerHTML = `<b>${price}</b> грн`
  elRow.classList.add('row')
  elDivForCart.classList.add('add-to-cart')
  elDivForFavorites.classList.add('add-to-favorites')
  elDivForCompare.classList.add('add-to-compare')

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

  id.appendChild(idSpan)
  productLink.appendChild(elImg)
  elWrapImg.appendChild(productLink)
  elDivForH3.appendChild(elH3)
  elDivForPrice.appendChild(elParForPrice)
  elDivForCart.appendChild(elCartBtn)
  elDivForFavorites.appendChild(elFavoritesBtn)
  elDivForCompare.appendChild(elCompareBtn)
  elRow.appendChild(elDivForCart)
  elRow.appendChild(elDivForFavorites)
  elRow.appendChild(elDivForCompare)

  elWrapProduct.appendChild(id)
  elWrapProduct.appendChild(elWrapImg)
  elWrapProduct.appendChild(elDivForH3)
  elWrapProduct.appendChild(elDivForLabels)
  elWrapProduct.appendChild(elDivForPrice)
  elWrapProduct.appendChild(elRow)

  // productLink.appendChild(elWrapProduct)

  return elWrapProduct
}

function generatePaginaionPage(pageNum) {
  const elPaginationLink = document.createElement('a')
  const elPageSpan = document.createElement('span')
  elPaginationLink.setAttribute('href', `index.html?page=${pageNum}`)
  elPageSpan.innerHTML = ` ${pageNum} `
  elPaginationLink.appendChild(elPageSpan)
  elPaginationLink.addEventListener('click', view.onClickPagination)
  return elPaginationLink
}
function setSearchParamAttr(link, pageNum) {
  link.setAttribute('href', `index.html?page=${pageNum}`)
}
function generateParagraphFindNothing() {
  const elParagraph = document.createElement('p')
  elParagraph.classList.add('zero-search')
  elParagraph.innerHTML = 'Ничего не найдено, уточните условия поиска'
  return elParagraph
}
function generateParagraph404Page() {
  const elCont = document.createElement('div')
  const elParagraph = document.createElement('p')
  elParagraph.classList.add('page-wrong')
  elParagraph.innerHTML = '404 Усп... что то пошло не так'
  const elImg = document.createElement('img')
  elImg.setAttribute('src', './img/404.png')
  elCont.appendChild(elParagraph)
  elCont.appendChild(elImg)
  elCont.elParagraph
  elCont.elImg
  return elCont
}

function generateCompareTable() {
  const table = document.createElement('table')
  table.classList.add('main-table')

  return table
}
function generateCartTableHead() {
  const cartTable = document.createElement('table')
  const cartTableTr = document.createElement('tr')

  const cartTdImage = document.createElement('td')
  cartTdImage.innerHTML = 'фото'
  const cartTdCaption = document.createElement('td')
  cartTdCaption.innerHTML = 'Название'
  const cartTdQty = document.createElement('td')
  cartTdQty.innerHTML = 'Колличество'
  const cartTdPrice = document.createElement('td')
  cartTdPrice.innerHTML = 'Цена'
  const cartTdEmpty = document.createElement('td')
  cartTdEmpty.innerHTML = '&nbsp;'

  cartTableTr.appendChild(cartTdImage)
  cartTableTr.appendChild(cartTdCaption)
  cartTableTr.appendChild(cartTdQty)
  cartTableTr.appendChild(cartTdPrice)
  cartTableTr.appendChild(cartTdEmpty)
  cartTable.appendChild(cartTableTr)

  return cartTable
}
function generateCartTableRowProduct(product) {
  console.log(product)
  const URL = 'https://web-app.click/pc-shop/photos/products/computers/'
  const picture = product.photos[0]
  const image = `${URL}${picture}`
  const img = document.createElement('img')
  img.setAttribute('src', `${image}`)

  const cartTableTr = document.createElement('tr')

  const tableTdPicture = document.createElement('td')
  tableTdPicture.classList.add('table-picture')

  const tableTdCaption = document.createElement('td')
  tableTdCaption.innerHTML = product.caption

  const tableTdQty = document.createElement('td')
  tableTdQty.innerHTML = '&nbsp;'

  const tableTdPrice = document.createElement('td')
  const priceUAH = product.priceUAH.toFixed()
  tableTdPrice.innerHTML = `${priceUAH} грн.`

  const btn = document.createElement('button')
  btn.innerText = 'Удалить'
  btn.setAttribute('id', `${product.id}`)

  const tableTdDeleteBtb = document.createElement('td')
  tableTdDeleteBtb.appendChild(btn)

  tableTdPicture.appendChild(img)
  cartTableTr.appendChild(tableTdPicture)
  cartTableTr.appendChild(tableTdCaption)
  cartTableTr.appendChild(tableTdQty)
  cartTableTr.appendChild(tableTdPrice)
  cartTableTr.appendChild(tableTdDeleteBtb)

  console.log(cartTableTr)
  return cartTableTr
}
function generateCartTableBottom() {
  const summ = model.getCartProductsSummPriceUAH().toFixed()
  const cartTableTr = document.createElement('tr')

  const tableTdSumm = document.createElement('td')
  tableTdSumm.innerHTML = 'Итого'
  const tableTdEmpty = document.createElement('td')
  tableTdEmpty.innerHTML = '&nbsp;'
  const tableTdEmpty2 = document.createElement('td')
  tableTdEmpty2.innerHTML = '&nbsp;'
  const tableTdSummPrice = document.createElement('td')
  tableTdSummPrice.innerHTML = `${summ} грн.`
  const tableTdEmpty3 = document.createElement('td')
  tableTdEmpty3.innerHTML = '&nbsp;'

  cartTableTr.appendChild(tableTdSumm)
  cartTableTr.appendChild(tableTdEmpty)
  cartTableTr.appendChild(tableTdEmpty2)
  cartTableTr.appendChild(tableTdSummPrice)
  cartTableTr.appendChild(tableTdEmpty3)

  return cartTableTr
}

function generateCompareTr() {
  const tableTrPicture = document.createElement('tr')
  tableTrPicture.classList.add('table-tr')
  return tableTrPicture
}
function generateCompareTd(param) {
  const emptyTd = document.createElement('td')
  emptyTd.innerHTML = param

  return emptyTd
}
function generateCompareTdPicture(product) {
  const URL = 'https://web-app.click/pc-shop/photos/products/computers/'
  const picture = product.photos[0]
  const image = `${URL}${picture}`
  const img = document.createElement('img')
  img.setAttribute('src', `${image}`)
  const tableTdPicture = document.createElement('td')
  tableTdPicture.classList.add('table-picture')
  tableTdPicture.appendChild(img)
  return tableTdPicture
}

const cardGenerator = {
  generateProductCard(product) {
    const URL = 'https://web-app.click/pc-shop/photos/products/computers/'

    const section = document.createElement('section')
    const cardContent = document.createElement('div')
    const cardContenTop = document.createElement('div')
    const cardTop = document.createElement('div')
    const containerNarrow = document.createElement('div')

    const cardInfoProp = document.createElement('span')

    const cardContentBottom = document.createElement('div')
    const cardBottomContent = document.createElement('div')
    const cardDescription = document.createElement('div')
    const cardDescriptionNavigation = document.createElement('ul')
    const containerNarrow2 = document.createElement('div')
    const cardDescriptionLeft = document.createElement('div')
    const cardDescriptionContent = document.createElement('div')
    const cardDescriptionLink = document.createElement('a')
    const cardDescriptionRight = document.createElement('div')
    const cardDescriptionItem = document.createElement('li')

    section.setAttribute('class', 'card')

    cardTop.setAttribute('class', 'card-top')

    cardContenTop.setAttribute('class', 'card-content__top')

    cardInfoProp.classList.add('product-prop')
    cardInfoProp.innerHTML = 'Best Seller'
    cardInfoProp.classList.add('card-info__prop')
    cardContent.setAttribute('class', 'card-content')

    containerNarrow.setAttribute('class', 'container-narrow')

    cardDescriptionNavigation.setAttribute(
      'class',
      'card-description__navigation'
    )

    cardContentBottom.setAttribute('class', 'card-content__bottom')
    cardInfoProp.setAttribute('class', 'best')
    containerNarrow.setAttribute('class', 'container')
    containerNarrow.classList.add('class', 'container-narrow')
    cardBottomContent.setAttribute('class', 'card-bottom-content')
    containerNarrow2.classList.add('container-narrow')
    containerNarrow2.classList.add('container')
    cardDescription.setAttribute('class', 'card-description')
    cardDescriptionLeft.setAttribute('class', 'card-description__left')
    cardDescriptionItem.setAttribute('class', 'card-description__item')
    cardDescriptionLink.setAttribute('class', 'card-description__link')
    cardDescriptionLink.textContent = 'Description'
    cardDescriptionRight.setAttribute('class', 'card-description__right')
    cardDescriptionContent.classList.add('card-description__content')
    cardDescriptionContent.classList.add('card-description__content--active')

    for (const key in product.attributes) {
      const cardDescriptionContent = this.generateParagraph(
        key,
        product.attributes[key]
      )
      cardDescriptionRight.appendChild(cardDescriptionContent)
    }

    const cardTopLeft = this.generateCardTopLeft(product)
    const cardTopRight = this.generateCardTopRight(product)

    cardDescriptionItem.appendChild(cardDescriptionLink)
    cardDescriptionNavigation.appendChild(cardDescriptionItem)
    cardDescriptionLeft.appendChild(cardDescriptionNavigation)
    cardDescription.appendChild(cardDescriptionLeft)
    cardDescription.appendChild(cardDescriptionRight)
    containerNarrow2.appendChild(cardDescription)
    cardBottomContent.appendChild(containerNarrow2)
    cardContentBottom.appendChild(cardBottomContent)

    containerNarrow.appendChild(cardTopLeft)
    containerNarrow.appendChild(cardTopRight)
    cardTop.appendChild(containerNarrow)
    cardContenTop.appendChild(cardTop)
    cardContent.appendChild(cardContenTop)
    cardContent.appendChild(cardContentBottom)
    section.appendChild(cardContent)

    return section
  },
  generateCardTopRight(product) {
    const price = (product.price * model.usdCourse).toFixed()
    const cardInfo = document.createElement('div')
    const cardTopRight = document.createElement('div')
    const cardInfoTitle = document.createElement('h3')
    const infoPriceCurrent = document.createElement('div')
    const cardInfoPrice = document.createElement('div')
    const cardInfoDescr = document.createElement('p')
    const toCartBtn = document.createElement('button')
    const toWishlistBtn = document.createElement('button')
    const toComparelistBtn = document.createElement('button')

    cardInfo.setAttribute('class', 'card-info')
    cardTopRight.setAttribute('class', 'card-top__right')
    cardInfoTitle.setAttribute('class', 'card-info__title')
    cardInfoTitle.textContent = `${product.caption}`
    infoPriceCurrent.textContent = `${price} грн`
    infoPriceCurrent.setAttribute('class', 'info-price__current')
    cardInfoPrice.setAttribute('class', 'card-info__price')
    cardInfoPrice.setAttribute('class', 'info-price')
    cardInfoDescr.setAttribute('class', 'card-info__descr')
    cardInfoDescr.textContent = `${product.description}`
    toCartBtn.classList.add('card-info__btn--tocart')
    toCartBtn.classList.add('btn-reset')
    toCartBtn.classList.add('card-info__btn')
    toCartBtn.textContent = 'Добавить в корзину'
    toWishlistBtn.classList.add('btn-reset')
    toWishlistBtn.classList.add('card-info__btn')
    toWishlistBtn.classList.add('card-info__btn--towishlist')
    toWishlistBtn.textContent = 'Добавить в избранное'
    toComparelistBtn.classList.add('card-info__btn')
    toComparelistBtn.classList.add('btn-reset')
    toComparelistBtn.classList.add('card-info__btn--tocomparelist')
    toComparelistBtn.textContent = 'Добавить в сравнение'

    cardInfoPrice.appendChild(infoPriceCurrent)
    cardInfo.appendChild(cardInfoTitle)
    cardInfo.appendChild(cardInfoPrice)
    cardInfo.appendChild(cardInfoDescr)
    cardInfo.appendChild(toCartBtn)
    cardInfo.appendChild(toWishlistBtn)
    cardInfo.appendChild(toComparelistBtn)

    cardTopRight.appendChild(cardInfo)

    return cardTopRight
  },

  generateCardTopLeft(product) {
    const URL = 'https://web-app.click/pc-shop/photos/products/computers/'
    // const pictureImg = product.photos[0]

    const cardTopLeft = document.createElement('div')
    cardTopLeft.classList.add('card-top__left', 'container-slider')
    const radioWrap = document.createElement('div')
    radioWrap.classList.add('radio-wrap')

    for (let i = 0; i < product.photos.length; i++) {
      const radio = document.createElement('input')
      if (i === 0) {
        radio.setAttribute('checked', '')
      }
      radio.setAttribute('type', 'radio')
      radio.setAttribute('id', `name${i}`)
      radio.setAttribute('name', 'name')
      cardTopLeft.appendChild(radio)
    }

    const labelWrap = document.createElement('div')

    for (let i = 0; i < product.photos.length; i++) {
      const img = product.photos[i]
      const image = URL + img
      const cardSliderMain = document.createElement('label')
      cardSliderMain.setAttribute('for', `name${i}`)

      const picture = document.createElement('img')
      picture.setAttribute('src', `${image}`)
      cardSliderMain.appendChild(picture)
      labelWrap.appendChild(cardSliderMain)
    }
    cardTopLeft.appendChild(labelWrap)

    return cardTopLeft
  },

  generateParagraph(key, value) {
    const cardDescriptionParagraph = document.createElement('p')
    const cardDescriptionContent = document.createElement('div')

    cardDescriptionParagraph.textContent += `${key} : ${value}`
    cardDescriptionContent.classList.add('card-description__content')
    cardDescriptionContent.classList.add('card-description__content--active')
    cardDescriptionContent.appendChild(cardDescriptionParagraph)

    return cardDescriptionContent
  },

  generateProductImages(product, URL) {
    product.photos.forEach(img => {
      const image = URL + img
      const cardSliderMain = document.createElement('div')
      cardSliderMain.classList.add('card-slider__main', 'image')
      const picture = document.createElement('img')
      picture.setAttribute('src', `${image}`)
      cardSliderMain.appendChild(picture)
      // console.log(cardSliderMain)
      return cardSliderMain
    })
  },

  generateSectionSimilarProducts() {
    const section = document.createElement('section')
    const h3Wrap = document.createElement('div')
    const h3 = document.createElement('h3')
    const semProductsWrap = document.createElement('div')
    semProductsWrap.classList.add('similar_products-wrap')
    h3.innerHTML = 'Похожие товары'
    section.classList.add('similar-products')
    h3Wrap.appendChild(h3)
    section.appendChild(h3Wrap)
    section.appendChild(semProductsWrap)
    return section
  },

  generateSimilarProduct(product) {
    const URL = 'https://web-app.click/pc-shop/photos/products/computers/'
    const img = product.photos[0]
    const image = URL + img
    const price = (product.price * model.usdCourse).toFixed()

    const elWrapProduct = document.createElement('div')
    const elWrapImg = document.createElement('div')
    const elLink = document.createElement('a')
    const elImg = document.createElement('img')
    const elDivForPrice = document.createElement('div')
    const elParForPrice = document.createElement('p')
    const elDivDesc = document.createElement('div')
    const elH4 = document.createElement('h4')
    elH4.innerHTML = `${product.caption}`

    elWrapProduct.classList.add('wrap-similar-product')
    elWrapImg.classList.add('similar_prod_img-wrap')
    elLink.setAttribute('href', `card.html?id=${product.id}`)
    elImg.setAttribute('src', `${image}`)
    elDivForPrice.classList.add('similar_prod-price')
    elParForPrice.innerHTML = `<b>${price}</b> грн`
    elDivDesc.classList.add('h4-wrap')
    elDivDesc.appendChild(elH4)
    elDivForPrice.appendChild(elParForPrice)
    elLink.appendChild(elImg)
    elWrapImg.appendChild(elLink)
    elWrapProduct.appendChild(elWrapImg)
    elWrapProduct.appendChild(elDivDesc)
    elWrapProduct.appendChild(elDivForPrice)

    return elWrapProduct
  },
  generateLinkGoToIndexPageOnSearch(searchQuery) {
    const link = document.createElement('a')
    link.setAttribute('href', `index.html?search-query=${searchQuery}`)
    link.setAttribute('target', '_blank')
    return link
  },
}

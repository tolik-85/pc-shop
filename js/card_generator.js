const cardGenerator = {
  // const URL :'https://web-app.click/pc-shop/photos/products/computers/',

  generateProductCard(product) {
    // console.log(product)
    const URL = 'https://web-app.click/pc-shop/photos/products/computers/'
    const pictureImg = product.photos[0]
    const image = `${URL}${pictureImg}`

    const price = (product.price * cardModel.usdCourse.rate).toFixed()
    // console.log(product.photos.length)

    const section = document.createElement('section')
    const cardContent = document.createElement('div')
    const cardContenTop = document.createElement('div')
    const cardTop = document.createElement('div')
    const containerNarrow = document.createElement('div')
    const cardTopLeft = document.createElement('div')
    const cardSlider = document.createElement('div')
    const cardTopRight = document.createElement('div')
    const cardSliderMain = document.createElement('div')
    // const img = document.createElement('img')
    const cardInfo = document.createElement('div')
    const cardInfoProp = document.createElement('span')
    const cardInfoPrice = document.createElement('div')
    const cardInfoTitle = document.createElement('h3')
    const toCartBtn = document.createElement('button')
    const toWishlistBtn = document.createElement('button')
    const infoPriceCurrent = document.createElement('div')
    const cardInfoDescr = document.createElement('p')
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
    const cardDescriptionParagraph = document.createElement('p')
    const cardDescriptionParagraph2 = document.createElement('p')
    const leftArrow = document.createElement('a')
    const rightArrow = document.createElement('a')
    const radioWrap = document.createElement('div')

    section.setAttribute('class', 'card')
    infoPriceCurrent.textContent = `${price} грн`
    cardTopLeft.classList.add('card-top__left', 'container-slider')
    cardInfoPrice.setAttribute('class', 'card-info__price')
    cardTop.setAttribute('class', 'card-top')
    cardInfoTitle.setAttribute('class', 'card-info__title')
    cardContenTop.setAttribute('class', 'card-content__top')
    cardInfo.setAttribute('class', 'card-info')
    cardInfoTitle.textContent = `${product.caption}`
    cardInfoProp.classList.add('product-prop')
    cardInfoProp.innerHTML = 'Best Seller'
    cardInfoProp.classList.add('card-info__prop')
    cardContent.setAttribute('class', 'card-content')
    cardTopRight.setAttribute('class', 'card-top__right')
    infoPriceCurrent.setAttribute('class', 'info-price__current')
    containerNarrow.setAttribute('class', 'container-narrow')
    // cardSliderMain.classList.add('card-slider__main', 'image')
    cardInfoDescr.setAttribute('class', 'card-info__descr')
    // img.setAttribute('src', `${image}`)
    toCartBtn.classList.add('card-info__btn--tocart')
    toCartBtn.classList.add('btn-reset')
    toCartBtn.classList.add('card-info__btn')
    toCartBtn.textContent = 'Добавить в корзину'
    cardSlider.setAttribute('class', 'card-slider')
    toWishlistBtn.classList.add('btn-reset')
    toWishlistBtn.classList.add('card-info__btn')
    toWishlistBtn.classList.add('card-info__btn--towishlist')
    toWishlistBtn.textContent = 'Добавить в избранное'
    cardDescriptionNavigation.setAttribute(
      'class',
      'card-description__navigation'
    )
    cardInfoPrice.setAttribute('class', 'info-price')
    cardInfoDescr.textContent = `${product.description}`
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
    // leftArrow.classList.add('prev')
    // leftArrow.innerHTML = '<'
    // rightArrow.classList.add('next')
    // rightArrow.innerHTML = '>'
    cardDescriptionContent.classList.add('card-description__content')
    cardDescriptionContent.classList.add('card-description__content--active')
    radioWrap.classList.add('radio-wrap')

    for (const key in product.attributes) {
      const cardDescriptionContent = this.generateParagraph(
        key,
        product.attributes[key]
      )
      cardDescriptionRight.appendChild(cardDescriptionContent)
    }
    for (let i = 0; i < product.photos.length; i++) {
      const radio = document.createElement('input')
      radio.setAttribute('type', 'radio')
      radio.setAttribute('id', `name${i}`)
      radio.setAttribute('name', 'name')
      // radioWrap.appendChild(radio)
      cardTopLeft.appendChild(radio)
    }
    // cardTopLeft.appendChild(radioWrap)

    const labelWrap = document.createElement('div')
    for (let i = 0; i < product.photos.length; i++) {
      const img = product.photos[i]
      const image = URL + img
      // const labelWrap = document.createElement('div')
      const cardSliderMain = document.createElement('label')
      cardSliderMain.setAttribute('for', `name${i}`)

      const picture = document.createElement('img')
      picture.setAttribute('src', `${image}`)
      cardSliderMain.appendChild(picture)
      labelWrap.appendChild(cardSliderMain)
    }
    cardTopLeft.appendChild(labelWrap)

    cardDescriptionItem.appendChild(cardDescriptionLink)
    cardDescriptionNavigation.appendChild(cardDescriptionItem)
    cardDescriptionLeft.appendChild(cardDescriptionNavigation)
    cardDescription.appendChild(cardDescriptionLeft)
    cardDescription.appendChild(cardDescriptionRight)
    containerNarrow2.appendChild(cardDescription)
    cardBottomContent.appendChild(containerNarrow2)
    cardContentBottom.appendChild(cardBottomContent)

    cardInfoPrice.appendChild(infoPriceCurrent)

    cardInfo.appendChild(cardInfoTitle)
    cardInfo.appendChild(cardInfoPrice)
    cardInfo.appendChild(cardInfoDescr)
    cardInfo.appendChild(toCartBtn)
    cardInfo.appendChild(toWishlistBtn)
    cardTopRight.appendChild(cardInfo)
    // cardSliderMain.appendChild(img)
    cardSlider.appendChild(cardSliderMain)
    // cardTopLeft.appendChild(cardSlider)
    // cardTopLeft.appendChild(rightArrow)
    containerNarrow.appendChild(cardTopLeft)
    containerNarrow.appendChild(cardTopRight)
    cardTop.appendChild(containerNarrow)
    cardContenTop.appendChild(cardTop)
    cardContent.appendChild(cardContenTop)
    cardContent.appendChild(cardContentBottom)
    section.appendChild(cardContent)

    // leftArrow.addEventListener('click', card_view.showPrevImg)
    // rightArrow.addEventListener('click', card_view.shoNextImg)

    // radio0.setAttribute('checked', 'true')

    return section
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
      console.log(cardSliderMain)
      return cardSliderMain
    })
  },
}

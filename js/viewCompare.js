const viewCompare = {
  async onLoadCompare() {
    await model.updateProductsAndUsdCourse()

    model.makeCompareProductsArr()
    const compareParams = this.makeCompareParams()

    this.renderCompareTable(compareParams)
  },
  renderCompareTable(compareParams) {
    const elMainCompare = document.querySelector('.main-compare')

    const table = generateCompareTable()
    const tableTr = generateCompareTr()
    const emptyTd = generateCompareTd('&nbsp;')

    elMainCompare.appendChild(table)
    table.appendChild(tableTr)
    tableTr.appendChild(emptyTd)
    model.compareProducts.forEach(product => {
      const compareTd = generateCompareTdPicture(product)
      tableTr.appendChild(compareTd)
    })

    const captionTr = generateCompareTr()
    table.appendChild(captionTr)
    const captionTd = generateCompareTd('Название')
    captionTr.appendChild(captionTd)

    model.compareProducts.forEach(product => {
      const productСaptionTd = generateCompareTd(product.caption)
      captionTr.appendChild(productСaptionTd)
    })

    const idTr = generateCompareTr()
    table.appendChild(idTr)
    const idTd = generateCompareTd('ID')
    idTr.appendChild(idTd)

    model.compareProducts.forEach(product => {
      const productIdTd = generateCompareTd(product.id)
      idTr.appendChild(productIdTd)
    })

    const priceTr = generateCompareTr()
    table.appendChild(priceTr)
    const priceTd = generateCompareTd('Цена')
    priceTr.appendChild(priceTd)

    model.compareProducts.forEach(product => {
      const productPriceTd = generateCompareTd(
        `${product.priceUAH.toFixed()} грн.`
      )
      priceTr.appendChild(productPriceTd)
    })

    compareParams.forEach(param => {
      let paramsTr = generateCompareTr()
      let paramsTd = generateCompareTd(param)
      paramsTr.appendChild(paramsTd)
      table.appendChild(paramsTr)
      model.compareProducts.forEach(product => {
        let compareTd = generateCompareTd(product.attributes[param])
        paramsTr.appendChild(compareTd)
      })
    })
    const buttonsTr = generateCompareTr()
    table.appendChild(buttonsTr)
    const buttonsTd = generateCompareTd('&nbsp;')
    buttonsTr.appendChild(buttonsTd)

    model.compareProducts.forEach(product => {
      const btn = document.createElement('button')
      btn.innerText = 'Удалить'
      btn.setAttribute('id', `${product.id}`)
      const buttonTd = document.createElement('td')
      buttonTd.appendChild(btn)
      buttonsTr.appendChild(buttonTd)
    })
  },

  makeCompareParams() {
    let compareParams = []
    model.compareProducts.forEach(product => {
      for (key in product.attributes) {
        if (!compareParams.includes(key)) {
          compareParams.push(key)
        }
      }
    })
    return compareParams
  },
}

if (location.pathname.toLowerCase().includes('/compare.html')) {
  // console.log('catalog')
  document.addEventListener(
    'DOMContentLoaded',
    viewCompare.onLoadCompare.bind(viewCompare)
  )
}

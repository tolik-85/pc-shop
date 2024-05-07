const card_view = {
  index: 0,

  async onLoadedCard() {
    const search = new URLSearchParams(location.search)

    const id = search.get('id')
    await card_controller.handleUpdateProduct(id)
    await card_controller.handleSimularProducts(id)
    card_controller.handleRenderProduct()
    // this.setFirstRadioCheckked()
    card_controller.renderSimularProductsSection()
  },
  // setFirstRadioCheckked() {
  //   const radio0 = document.querySelector('#name0')
  //   // radio0.setAttribute('checked', 'true')
  //   radio0.checked = true
  //   // console.log(radio0)
  // },
  renderMain(product) {
    const elMain = document.querySelector('main')
    const productCard = cardGenerator.generateProductCard(product)
    const section = cardGenerator.generateSectionSimularProducts()
    elMain.appendChild(productCard)
    elMain.appendChild(section)
  },
  renderSimularProducts(product) {
    const section = document.querySelector('.simular-products')
    const simProdWrap = document.querySelector('.simular_products-wrap')
    const semProd = cardGenerator.generateSimularProduct(product)
    simProdWrap.appendChild(semProd)
    section.appendChild(simProdWrap)
  },
}
document.addEventListener(
  'DOMContentLoaded',
  card_view.onLoadedCard.bind(card_view)
)

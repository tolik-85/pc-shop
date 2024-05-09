const card_view = {
  index: 0,

  async onLoadedCard() {
    const search = new URLSearchParams(location.search)
    const id = search.get('id')
    await card_controller.handleUpdateProduct(id)
    await card_controller.handleSimularProducts(id)
    card_controller.handleRenderProduct()
    card_controller.renderSimularProductsSection()
  },

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

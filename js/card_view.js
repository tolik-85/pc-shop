const card_view = {
  async onLoadedCard() {
    await card_controller.handleUpdateProduct('13')
    card_controller.handleRenderProduct()
  },
  renderMain(product) {
    const elMain = document.querySelector('main')
    const productCard = cardGenerator.generateProductCard(product)
    elMain.appendChild(productCard)
  },
}
document.addEventListener(
  'DOMContentLoaded',
  card_view.onLoadedCard.bind(card_view)
)

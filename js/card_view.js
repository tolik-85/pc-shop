const card_view = {
  index: 0,

  async onLoadedCard(id) {
    await card_controller.handleUpdateProduct(id)
    card_controller.handleRenderProduct()
    this.setFirstRadioCheckked()
    console.log(window.location.pathname)
  },
  setFirstRadioCheckked() {
    const radio0 = document.querySelector('#name0')
    // radio0.setAttribute('checked', 'true')
    radio0.checked = true
    // console.log(radio0)
  },
  renderMain(product) {
    console.log(product)
    const elMain = document.querySelector('main')
    const productCard = cardGenerator.generateProductCard(product)
    elMain.appendChild(productCard)
  },
}
// document.addEventListener(
//   'DOMContentLoaded',
//   card_view.onLoadedCard.bind(card_view)
// )

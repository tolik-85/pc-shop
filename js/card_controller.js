const card_controller = {
  async handleUpdateProduct(id) {
    await cardModel.updateProduct(id)
    await cardModel.updateCourse()
  },
  handleRenderProduct() {
    const product = cardModel.getProduct()
    cardGenerator.generateProductCard(product)
    card_view.renderMain(product)
  },
  async handleSimularProducts(id) {
    await cardModel.updateSimularProductsId(id)
  },
  renderSimularProductsSection() {
    cardModel.simularProductsId.forEach(async prod => {
      let product = await card_api.loadProduct(prod.relatedProductId)
      card_view.renderSimularProducts(product)
    })
  },
}

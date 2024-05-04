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
}

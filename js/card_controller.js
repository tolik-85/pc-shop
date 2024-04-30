const card_controller = {
  async handleUpdateProduct(id) {
    // console.log(id)
    await cardModel.updateProduct(id)
    await cardModel.updateCourse()
  },
  handleRenderProduct() {
    const product = cardModel.getProduct()
    card_view.renderMain(product)
    // cardGenerator.generateProductCard(product)
  },
}

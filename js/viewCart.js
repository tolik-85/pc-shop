const viewCart = {
  async onLoadCart() {
    await model.updateProductsAndUsdCourse()
    model.makeCartProductsArr()
    this.renderCartTable()
  },
  renderCartTable() {
    const cartMain = document.querySelector('.main-cart')
    const cartTable = generateCartTableHead()
    cartMain.appendChild(cartTable)

    model.cartProducts.forEach(product => {
      console.log(product)
      const cartTableRowProduct = generateCartTableRowProduct(product)
      cartTable.appendChild(cartTableRowProduct)
    })
    const cartTableBottom = generateCartTableBottom()
    cartTable.appendChild(cartTableBottom)
  },
}
if (location.pathname.toLowerCase().includes('/cart.html')) {
  document.addEventListener(
    'DOMContentLoaded',
    viewCart.onLoadCart.bind(viewCart)
  )
}

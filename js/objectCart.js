const modelCart = {
  productsIds: ['14', '22'],
  products: [{}],
  productsCounter: 1,
  totalSumUah: 42000,

  async addProductById(id) {
    this.productsIds.push(id)
    await this.updateProductsById(id)
  },

  async updateProductsById(id) {
    const product = await api.loadProduct(id)
    await model.updateUsdCourse()
    this.calcPriceUah(product)
    this.products.push(product)
  },

  calcPriceUah(product) {
    product.priceUAH = Math.round(product.price * model.usdCourse)
  },

  removeProductById(id) {
    this.productsIds = this.productsIds.filter(pId => pId !== id)
    this.products = this.products.filter(product => product.id !== id)
  },

  // async updateProduct() {
  //   this.productsIds.forEach(id => {
  //     this.updateProductsById(id)
  //   })
  // },
  async updateProduct() {
    const promises = this.productsIds.map(id => this.updateProductsById(id))
    await Promise.all(promises)
  },

  async onLoadedCart() {
    await this.updateProduct()
    this.renderCartTable()
    // this.updateProductsById()
  },

  renderCartTable() {
    this.products.shift()
    // console.log(this.productsIds)
    const cartMain = document.querySelector('.main-cart')
    const cartTable = generateCartTableHead()
    cartMain.appendChild(cartTable)
    console.log(this.products)
    this.products.forEach(product => {
      console.log(product)
      const cartTableRowProduct = generateCartTableRowProduct(product)
      cartTable.appendChild(cartTableRowProduct)
    })
  },
}

if (location.pathname.toLowerCase().includes('/cart.html')) {
  document.addEventListener(
    'DOMContentLoaded',
    modelCart.onLoadedCart.bind(modelCart)
  )
}
// api.loadProductById()

// async updateProductsAndUsdCourse() {
//   await Promise.all([this.updateUsdCourse(), this.updateProducts()])
//   this.addUAHPriceToProducts()

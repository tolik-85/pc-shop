const modelCart = {
  productsIds: ['14'],
  products: [{}],
  productsCounter: 1,
  totalSumUah: 42000,

  async addProductById(id) {
    this.productsIds.push(id)
    await this.updateProductsById(id)
  },

  async updateProductsById(id) {
    const product = await api.loadProductById(id)
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
}

// api.loadProductById()

// async updateProductsAndUsdCourse() {
//   await Promise.all([this.updateUsdCourse(), this.updateProducts()])
//   this.addUAHPriceToProducts()
// },

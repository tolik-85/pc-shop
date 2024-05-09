const cardModel = {
  product: '',
  simularProductsId: [],
  simularProducts: [],
  usdCourse: {
    rate: '',
  },

  async updateProduct(id) {
    const product = await card_api.loadProduct(id)
    this.setProduct(product)
  },
  async updateSimularProductsId(id) {
    this.simularProductsId = await card_api.loadSimilarProducts(id)
  },
  updateSimularProducts() {
    this.simularProductsId.forEach(async prod => {
      let product = await card_api.loadProduct(prod.relatedProductId)
      this.simularProducts.push(product)
    })
  },
  getProduct() {
    return this.product
  },
  setProduct(product) {
    this.product = product
  },
  setSimularProducts(product) {
    this.simularProducts.shift(product)
  },
  getSimularProducts() {
    return this.simularProducts
  },
  async updateCourse() {
    const course = await api.loadCourse()
    this.setUsdCouse(course)
  },

  // setUsdCouse(course) {
  //   course.forEach(item => {
  //     for (key in item) {
  //       if (item[key] === 840) {
  //         this.usdCourse.rate = item.rate
  //       }
  //     }
  //   })
  // },
  setUsdCouse(course) {
    this.usdCourse.rate = course
  },
}

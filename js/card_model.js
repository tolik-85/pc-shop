const cardModel = {
  product: '',
  usdCourse: {
    rate: '',
  },

  async updateProduct(id) {
    const product = await card_api.loadProduct(id)
    console.log(product)
    this.setProduct(product)
  },
  getProduct() {
    return this.product
  },
  setProduct(product) {
    this.product = product
  },
  async updateCourse() {
    const course = await card_api.loadCourse()
    this.setUsdCouse(course)
  },

  setUsdCouse(course) {
    course.forEach(item => {
      for (key in item) {
        if (item[key] === 840) {
          this.usdCourse.rate = item.rate
        }
      }
    })
  },
}

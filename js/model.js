const model = {
  avalibleProducts: [],
  filter: {},

  setAvalibleProducts(avalibleProducts) {
    this.avalibleProducts = avalibleProducts
  },

  async getProducts() {
    const productList = await api.loadProducts()
    return productList
  },

  filterForCategories() {
    model.avalibleProducts.forEach(item => {
      for (key in item.specs) {
        if (!model.filter[key]) {
          model.filter[key] = {}
        }
        for (key2 in item.specs[key]) {
          if (!model.filter[key][key2]) {
            model.filter[key][key2] = []
          }
          for (key3 of item.specs[key][key2]) {
            if (!model.filter[key][key2].includes(item.specs[key][key2])) {
              model.filter[key][key2].push(item.specs[key][key2])
            }
          }
        }
      }
    })
  },
}

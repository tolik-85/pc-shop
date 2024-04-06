const model = {
  avalibleProducts: [],
  filterModel: {},

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
        if (!model.filterModel[key]) {
          model.filterModel[key] = {}
        }
        for (key2 in item.specs[key]) {
          if (!model.filterModel[key][key2]) {
            model.filterModel[key][key2] = []
          }
          for (key3 of item.specs[key][key2]) {
            if (!model.filterModel[key][key2].includes(item.specs[key][key2])) {
              model.filterModel[key][key2].push(item.specs[key][key2])
            }
          }
        }
      }
    })
  },
}

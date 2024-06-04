const controller = {
  handleVortex(pageNum = 0) {
    model.setCurPage(pageNum)
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    view.renderPagination(model.curPage, model.productsTotal, model.pagesCount)
  },
  handledataList() {
    const productsNames = model.getProductsCaptions()
    view.renderDataList(productsNames)
  },
  async handleLoadCatalog() {
    await model.updateProductsAndUsdCourse()
    this.handleVortex()
    view.renderWrapFilter(model.makeFilter())
    view.renderRangePrice(model.maxPrice, model.minPrice)
    this.handledataList()
  },

  handleSearch(query) {
    model.setSearchQuery(query)
    // console.log(query)
    this.handleVortex()
    view.renderWrapFilter(model.makeFilter())
    view.renderRangePrice(model.maxPrice, model.minPrice)
  },

  handleFiltrate(checkedIds, priceFrom, priceTo) {
    console.log('controller.priceFrom ', priceFrom)
    console.log('controller.priceTo ', priceTo)
    model.addAllCheckedCheckboxes(checkedIds)
    model.setPriceFromTo(+priceFrom, +priceTo)
    this.handleVortex()
    view.renderRangePrice(model.maxPrice, model.minPrice)
  },

  handleSorting(sortingType) {
    model.setSortingType(sortingType)
    this.handleVortex()
  },

  handlePagination(pageNum) {
    this.handleVortex(+pageNum)
  },

  handleProductsOnPage(itemsOnPage) {
    model.setProductsOnPage(+itemsOnPage)
    this.handleVortex()
  },

  // ===== Конец каталога

  handleAddToCart(productId) {
    model.cart.push(productId)
    const qty = model.cart.length
    if (qty > 0) {
      view.renderCartQty(qty)
    }
    // console.log(`>>>model.cart ${model.cart}`)
  },

  hanldeAddToCompare(productId) {
    model.compare.push(productId)
    const qty = model.compare.length
    if (qty > 0) {
      view.renderCompareQty(qty)
    }
    // console.log(`>>>model.compare ${model.compare}`)
  },

  handleAddToFavorites(productId) {
    model.favorites.push(productId)
    const qty = model.favorites.length
    if (model.favorites.length > 0) {
      view.renderFavoritesQty(qty)
    }
    // console.log(`>>>model.favorites ${model.favorites}`)
  },

  async handleUpdateProduct(id) {
    await model.updateProduct(id)
    await model.updateUsdCourse()
  },

  handleRenderProduct() {
    const product = model.getProduct()
    cardGenerator.generateProductCard(product)
    view.renderMain(product)
  },

  async handleSimilarProducts(id) {
    await model.updateSimilarProductsIdList(id)
  },

  async handleSimilarProductsSection() {
    await model.updateSimilarProducts()
    model.similarProducts.forEach(similarProduct => {
      view.renderSimilarProducts(similarProduct)
    })
  },
}

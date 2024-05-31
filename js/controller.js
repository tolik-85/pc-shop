const controller = {
  async handleLoadCatalog() {
    await model.updateProductsAndUsdCourse()
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    model.calcProductsTotal()
    model.calcPagesCount()
    view.renderPagination(model.curPage, model.productsTotal, model.pagesCount)
    view.renderWrapFilter(model.makeFilter())
  },

  handleFiltrate(checkedIds, priceFrom, priceTo) {
    model.addAllCheckedCheckboxes(checkedIds)
    model.setPriceFromTo(priceFrom, priceTo)
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    model.calcProductsTotal()
    model.calcPagesCount()
    view.renderPagination(model.curPage, model.productsTotal, model.pagesCount)
  },

  handleProductsOnPage(itemsOnPage) {
    model.setProductsOnPage(+itemsOnPage)
    model.setCurPage(0)
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    model.calcProductsTotal()
    model.calcPagesCount()
    view.renderPagination(model.curPage, model.productsTotal, model.pagesCount)
  },

  handlePagination(pageNum) {
    model.setCurPage(+pageNum)
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    model.calcProductsTotal()
    model.calcPagesCount()
    view.renderPagination(model.curPage, model.productsTotal, model.pagesCount)
  },

  handleSorting(sortingType) {
    model.setSortingType(sortingType)
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    model.calcProductsTotal()
    model.calcPagesCount()
    model.setCurPage(0)
    view.renderPagination(model.curPage, model.productsTotal, model.pagesCount)
  },

  handleSearch(query) {
    model.setSearchQuery(query)
    model.setCurPage(0)
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    model.calcProductsTotal()
    model.calcPagesCount()
    view.renderPagination(model.curPage, model.productsTotal, model.pagesCount)
    view.renderWrapFilter(model.makeFilter())
    view.renderRangePrice(model.maxPrice, model.minPrice)
  },

  addToCartHandler(productId) {
    model.cart.push(productId)
    const qty = model.cart.length
    if (qty > 0) {
      view.renderCartQty(qty)
    }
    // console.log(`>>>model.cart ${model.cart}`)
  },

  addToCompareHandler(productId) {
    model.compare.push(productId)
    const qty = model.compare.length
    if (qty > 0) {
      view.renderCompareQty(qty)
    }
    // console.log(`>>>model.compare ${model.compare}`)
  },

  addToFavoritesHandler(productId) {
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

const controller = {
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

  handleFiltrate(checkedIds, priceFrom, priceTo) {
    model.addAllCheckedCheckboxes(checkedIds)
    model.setPriceFromTo(priceFrom, priceTo)
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    view.renderPagination()
  },

  async handleUpdateProducts(isLoad) {
    await model.updateProductsAndUsdCourse()
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    view.renderPagination()
  },

  handleProductsOnPage(itemsOnPage) {
    model.setProductsOnPage(+itemsOnPage)
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    view.renderPagination()
  },

  handlePagination(pageNum) {
    model.setCurPage(+pageNum)
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    view.renderPagination()
  },

  handleSorting(sortingType) {
    model.setSortingType(sortingType)
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    view.renderPagination()
  },

  handleFilter() {
    model.makeFilter()
    const filter = model.getFilter()
    view.renderElWrapCheckboxClear()
    view.renderWrapFilter(filter)
  },

  searchHandler(query) {
    model.setSearchQuery(query)
    model.searchProducts()
    model.filtrateProducts()
    model.filtrateProductsByPrice(0, 20000000)
    model.sortedProducts = model.pricedProducts
    model.paginateProducts(0)

    view.renderContainerProducts(model.paginatedProducts)

    this.handleFilter()
    view.renderRangeWrapOnSearch(model.getMaxPriceUAH(), model.getMinPriceUAH())
    view.renderPagination()

    if (model.paginatedProducts.length === 0) {
      view.renderContainerProductsOnZeroSearch()
    }
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

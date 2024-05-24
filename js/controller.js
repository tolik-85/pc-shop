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

  handleFiltrate() {
    model.filtrateProducts()
    this.handlePriceFilter()
    view.renderContainerProductsClear()
    model.sortedProducts = model.pricedProducts
    model.paginateProducts(0)
    view.renderContainerProducts(model.paginatedProducts)

    view.rednerPaginationClear()
    view.renderPagination()
    view.renderSortSelect()
    view.paginationBoldfirstElOnload()
    if (model.paginatedProducts.length === 0) {
      view.renderContainerProductsOnZeroSearch()
    }
  },

  async handleUpdateProducts(isLoad) {
    await model.updateProductsAndUsdCourse()
    model.vortex()
    view.renderContainerProducts(model.paginatedProducts)
    view.renderPagination()
    view.paginationBoldfirstElOnload()
  },

  onChangeElSelectPaginationHandler(itemsOnPage) {
    if (itemsOnPage > 0) {
      model.setProductsOnPage(itemsOnPage)
      view.renderContainerProductsClear()
      model.sortedProducts = model.pricedProducts
      model.paginateProducts(0)
      view.renderContainerProducts(model.paginatedProducts)
      view.rednerPaginationClear()
      view.renderPagination()
      view.renderSortSelect()
      view.paginationBoldfirstElOnload()
    }
  },

  onClickPaginationHandler(pageNum) {
    model.paginateProducts(pageNum)
    view.renderContainerProductsClear()
    view.renderContainerProducts(model.paginatedProducts)
  },

  handlePriceFilter() {
    const priceFrom = document.querySelector('#priceFrom').value
    const priceTo = document.querySelector('#priceTo').value
    model.filtrateProductsByPrice(priceFrom, priceTo)
  },

  handlerElSelect(elSelectValue) {
    model.sortProducts(elSelectValue)
    model.paginateProducts(0)
    view.renderContainerProductsClear()
    view.renderContainerProducts(model.paginatedProducts)
    view.paginationBoldfirstElOnload()
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

    view.renderContainerProductsClear()
    view.renderContainerProducts(model.paginatedProducts)

    this.handleFilter()
    view.renderRangeWrapOnSearch(model.getMaxPriceUAH(), model.getMinPriceUAH())
    view.rednerPaginationClear()
    view.renderPagination()
    view.paginationBoldfirstElOnload()
    view.renderFilterCheckboxes()
    view.renderSortSelect()

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
